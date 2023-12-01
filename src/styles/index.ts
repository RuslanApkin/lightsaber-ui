import { CSSProperties, useContext } from "react";
import { DesignContext, IDesignConfig } from "../provider";
import { IStyledProps } from "../types";
import { updatePadding } from "./padding";
import { getStyleObjFromCss } from "../utils/cssToObj";
import { updateBorderRadiusFromRounded } from "./rounded";
import { defaultConfig } from "../provider/data/defaultConfig";

const isPropsStyled = <T>(props: T): boolean =>
    Object.prototype.hasOwnProperty.call(props, "p") && true;

export const getPrimaryStyles = <T extends IStyledProps>(
    props: T
): CSSProperties => {
    const config: IDesignConfig = useContext(DesignContext) || defaultConfig;
    const style: CSSProperties = {};

    if (isPropsStyled<T>(props)) {
        style.backgroundColor = props.color;
        updateBorderRadiusFromRounded(style, props.rounded || config.rounded);
        updatePadding(style, props.p, props.px, props.py);
    }

    const styleFromCss = getStyleObjFromCss(props.css);
    const primaryStyles: CSSProperties = {
        ...style,
        ...styleFromCss,
        ...props.style
    };

    return primaryStyles;
};
