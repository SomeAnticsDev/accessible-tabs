import * as React from "react";
import composeClassNames from "clsx";
import { useId, composeEventHandlers, useComposedRefs } from "./utils";

const Tabs = React.forwardRef(
  ({ as: Element = "div", className, children, ...props }, forwardedRef) => {
    const INTERNAL_CLASS_NAME = "Tabs";
    return (
      <div ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

const TabList = React.forwardRef(
  ({ as: Element = "div", className, children, ...props }, forwardedRef) => {
    const INTERNAL_CLASS_NAME = "Tabs__tablist";
    return (
      <div ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  }
);
TabList.displayName = "TabList";

const Tab = React.forwardRef(
  ({ as: Element = "div", className, children, ...props }, forwardedRef) => {
    const INTERNAL_CLASS_NAME = "Tabs__tab";
    return (
      <div ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  }
);
Tab.displayName = "Tab";

const TabPanels = React.forwardRef(
  ({ as: Element = "div", className, children, ...props }, forwardedRef) => {
    const INTERNAL_CLASS_NAME = "Tabs__panels";
    return (
      <div ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  }
);
TabPanels.displayName = "TabPanels";

const TabPanel = React.forwardRef(
  ({ as: Element = "div", className, children, ...props }, forwardedRef) => {
    const INTERNAL_CLASS_NAME = "Tabs__panel";
    return (
      <div ref={forwardedRef} {...props}>
        {children}
      </div>
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
