import * as React from "react";
import cx from "clsx";
import { toArray, bemSlugify, bemModify } from "./utils";

/**
 * @typedef {{
 *     as?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
 *     alignContent?: "normal" | FlexJustify;
 *     alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
 *     flexGrow?: 0 | 1;
 *     flexShrink?: 0 | 1;
 *     direction?: "row" | "column";
 *     justifyContent?: FlexJustify;
 *     gap?: number;
 *     className?: string;
 *     reset?: Reset | Reset[];
 * }} FlexProps
 */

const Flex = React.forwardRef(
  /**
   * @param {FlexProps} props
   * @param {*} ref
   * @return {*}
   */
  function Flex(
    {
      as: El = "div",
      alignContent = "normal",
      alignItems = "stretch",
      justifyContent = "center",
      direction = "row",
      flexGrow,
      flexShrink,
      gap = 0,
      className,
      reset,
      ...props
    },
    ref
  ) {
    gap = Math.round(gap);
    return (
      <El
        className={cx(
          "Flex",
          `Flex--ac-${alignContent}`,
          `Flex--ai-${alignItems}`,
          `Flex--jc-${justifyContent}`,
          `Flex--fd-${direction}`,
          {
            [`Flex--gap-${gap < 10 ? `0${gap}` : gap}`]: gap > 0,
          },
          composeToClassObject("Flex", reset, "reset"),
          composeToClassObject("Flex", flexGrow, "flex-grow"),
          composeToClassObject("Flex", flexShrink, "flex-shrink"),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Flex.displayName = "Flex";
export { Flex };

/**
 * @typedef {{
 *     as?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
 *     className?: string;
 *     flexGrow?: 0 | 1;
 *     flexShrink?: 0 | 1;
 *     reset?: Reset | Reset[];
 * }} BoxProps
 */

const Box = React.forwardRef(
  /**
   * @param {BoxProps} props
   * @param {*} ref
   * @return {*}
   */
  function Box(
    { as: El = "div", className, flexGrow, flexShrink, reset, ...props },
    ref
  ) {
    return (
      <El
        className={cx(
          "Box",
          composeToClassObject("Box", reset, "reset"),
          composeToClassObject("Box", flexGrow, "flex-grow"),
          composeToClassObject("Box", flexShrink, "flex-shrink"),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";
export { Box };

/**
 * @typedef {{
 *     as?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
 *     className?: string;
 *     flexGrow?: 0 | 1;
 *     flexShrink?: 0 | 1;
 *     reset?: Reset | Reset[];
 * }} ContainerProps
 */

const Container = React.forwardRef(
  /**
   * @param {ContainerProps} props
   * @param {*} ref
   * @return {*}
   */
  function Container(
    { as: El = "div", className, flexGrow, flexShrink, reset, ...props },
    ref
  ) {
    return (
      <El
        className={cx(
          "Container",
          composeToClassObject("Container", reset, "reset"),
          composeToClassObject("Container", flexGrow, "flex-grow"),
          composeToClassObject("Container", flexShrink, "flex-shrink"),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
export { Container };

/**
 * @typedef {"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "end" | "start"} FlexJustify
 */

/**
 * @typedef {"list" | "heading" | "paragraph" | "button" | "text-block"} Reset
 */

/**
 * @param {string} baseClass
 * @param {undefined | null | string | string[]} modifier
 * @param {string} [modifierPrefix]
 * @returns {Record<string, string>}
 */
function composeToClassObject(baseClass, modifier, modifierPrefix) {
  if (!modifier) {
    return {};
  }

  return toArray(modifier).reduce((prev, entry) => {
    return {
      ...prev,
      [bemModify(baseClass, bemSlugify(modifierPrefix, modifier))]:
        entry != null,
    };
  }, {});
}
