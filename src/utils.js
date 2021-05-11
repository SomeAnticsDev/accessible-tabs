import { useState, useEffect, useCallback } from "react";

let id = 0;
const genId = () => ++id;

/**
 * @return {string | null}
 */
export function useId() {
  const [id, setId] = useState(null);
  useEffect(() => setId(genId()), []);
  return id != null ? String(id) : null;
}

/**
 * @template EventType extends React.SyntheticEvent | Event
 * @param {((event: EventType) => any) | undefined} external
 * @param {(event: EventType) => any} internal
 * @return {(event: EventType) => void}
 */
export function composeEventHandlers(external, internal) {
  return function (event) {
    external && external(event);
    if (!event.defaultPrevented) {
      return internal(event);
    }
  };
}

/**
 * Passes or assigns an arbitrary value to a ref function or object.
 * @template RefValueType
 * @param {(AssignableRef<RefValueType> | null | undefined)} ref
 * @param {*} value
 * @return {*}
 */
export function assignRef(ref, value) {
  if (ref == null) return;
  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

/**
 *
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @template RefValueType
 * @param {(...(AssignableRef<RefValueType> | null | undefined)[])} refs
 * @return {(node: RefValueType) => void}
 */
export function useComposedRefs(...refs) {
  return useCallback((node) => {
    for (let ref of refs) {
      assignRef(ref, node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

/**
 * @template T
 * @param {T | T[]} val
 * @return {T[]}
 */
export function toArray(val) {
  return Array.isArray(val) ? val : [val];
}

/**
 * @param {string} baseClass
 * @param {string} element
 * @return {string}
 */
export function bemElementify(baseClass, element) {
  return [baseClass, element].join("__");
}

/**
 * @param {string} className
 * @param {string | null | undefined} modifier
 * @return {string}
 */
export function bemModify(className, modifier) {
  return [className, modifier].filter(Boolean).join("--");
}

/**
 * @param {string} className
 * @param {string | null | undefined} postfix
 * @return {string}
 */
export function bemSlugify(className, postfix) {
  return [className, postfix].filter(Boolean).join("-");
}

/**
 * Checks whether or not a value is a function.
 * @param {*} value
 * @return {*} {value is Function}
 */
export function isFunction(value) {
  // eslint-disable-next-line eqeqeq
  return !!(value && {}.toString.call(value) == "[object Function]");
}
