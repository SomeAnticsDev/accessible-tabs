import * as React from "react";
import composeClassNames from "clsx";
import { useId, composeEventHandlers, useComposedRefs } from "./utils";

const TabsContext = React.createContext();

const Tabs = React.forwardRef(
	({ as: Element = "div", className, children, defaultValue, ...props }, forwardedRef) => {
		const INTERNAL_CLASS_NAME = "Tabs";

		const [activeValue, setActiveValue] = React.useState(defaultValue || null);
		const tabsId = makeId('tabs', useId());

		return (
			<Element className={composeClassNames(INTERNAL_CLASS_NAME, className)} ref={forwardedRef} {...props}>
				<TabsContext.Provider
					value={{
						tabsId,
						isActive: React.useCallback((value) => {
							return value === activeValue;
						}, [activeValue]),
						setActiveValue
					}}
				>
					<DescendantProvider>
						{children}
					</DescendantProvider>
				</TabsContext.Provider>
			</Element>
		);
	}
);
Tabs.displayName = "Tabs";

const TabList = React.forwardRef(
	({ as: Element = "div", className, children, ...props }, forwardedRef) => {
		const INTERNAL_CLASS_NAME = "Tabs__tablist";
		return (
			<Element className={composeClassNames(INTERNAL_CLASS_NAME, className)} role="tablist" ref={forwardedRef} {...props}>
				{children}
			</Element>
		);
	}
);
TabList.displayName = "TabList";

const Tab = React.forwardRef(
	({ as: Element = "button", className, children, value, onClick, onKeyDown, onFocus, ...props }, forwardedRef) => {
		const INTERNAL_CLASS_NAME = "Tabs__tab";
		const { tabsId, isActive, setActiveValue } = React.useContext(TabsContext);
		const active = isActive(value);
		const panelId = makeId(tabsId, 'panel', value);
		const buttonId = makeId(tabsId, 'button', value);
		const {getIndex, register, deregister, keys} = useDescendants();

		const ownRef = React.useRef();
		const mounted = React.useRef();
		const ref = useComposedRefs(ownRef, forwardedRef);

		React.useEffect(() => {
			if (!mounted.current) {
				mounted.current = true;
				return;
			}

			if (active && document.activeElement !== ownRef.current) {
				ownRef.current.focus();
			}
		}, [active]);

		React.useEffect(() => {
			register(value);
			return () => deregister(value);
		}, [value]);

		const handleKeyDown = (event) => {
			const index = getIndex(value);
			const lastIndex = keys.length - 1;
			const nextIndex = clamp(index + 1, 0, lastIndex);
			const previousIndex = clamp(index - 1, 0, lastIndex);
			switch(event.key) {
				case 'ArrowLeft':
					setActiveValue(keys[previousIndex]);
					return;
				case 'ArrowRight':
					setActiveValue(keys[nextIndex]);
					return;
				case 'Home':
					setActiveValue(keys[0]);
					return;
				case 'End':
					setActiveValue(keys[lastIndex]);
					return;
				default:
					return;
			}
		}

		const handleClick = (event) => {
			setActiveValue(value);
		};

		const handleFocus = (event) => {
			setActiveValue(value);
		};

		return (
			<Element
				role="tab"
				onClick={composeEventHandlers(onClick, handleClick)}
				onFocus={composeEventHandlers(onFocus, handleFocus)}
				onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
				id={buttonId}
				aria-selected={active}
				tabIndex={active ? '0' : '-1'}
				aria-controls={panelId}
				className={composeClassNames(INTERNAL_CLASS_NAME, className)}
				ref={ref}
				{...props}
			>
				{children}
			</Element>
		);
	}
);
Tab.displayName = "Tab";

const TabPanels = React.forwardRef(
	({ as: Element = "div", className, children, ...props }, forwardedRef) => {
		const INTERNAL_CLASS_NAME = "Tabs__panels";
		return (
			<Element className={composeClassNames(INTERNAL_CLASS_NAME, className)} ref={forwardedRef} {...props}>
				{children}
			</Element>
		);
	}
);
TabPanels.displayName = "TabPanels";

const TabPanel = React.forwardRef(
	({ as: Element = "div", className, children, value, ...props }, forwardedRef) => {
		const INTERNAL_CLASS_NAME = "Tabs__panel";
		const { tabsId, isActive } = React.useContext(TabsContext);
		const active = isActive(value);
		const panelId = makeId(tabsId, 'panel', value);
		const buttonId = makeId(tabsId, 'button', value);
		return (
			<Element
				id={panelId}
				aria-labelledby={buttonId}
				tabIndex={active ? '0' : '-1'}
				hidden={!active ? true : undefined}
				ref={forwardedRef}
				role="tabpanel"
				className={composeClassNames(INTERNAL_CLASS_NAME, className)}
				{...props}
			>
				{children}
			</Element>
		);
	}
);
TabPanel.displayName = "TabPanel";

export { Tabs, TabList, Tab, TabPanels, TabPanel };

const DescendantContext = React.createContext();

function DescendantProvider({ children }) {
	let [keys, setKeys] = React.useState([]);

	return (
		<DescendantContext.Provider
			value={{
				keys,
				register: React.useCallback((key) => {
					setKeys((keys) => keys.filter(getKeyFilter(key)).concat(key));
				}, []),
				deregister: React.useCallback((key) => {
					setKeys((keys) => keys.filter(getKeyFilter(key)));
				}, []),
				getIndex: React.useCallback(
					(key) => {
						return keys.indexOf(key);
					},
					[keys]
				),
			}}
		>
			{children}
		</DescendantContext.Provider>
	);
}

function useDescendants() {
	return React.useContext(DescendantContext);
}

function getKeyFilter(key) {
	return (k) => k !== key;
}

function makeId(...parts) {
	return parts.filter(Boolean).join("-");
}

function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
