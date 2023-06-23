import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createBreakpoint } from "styled-components-breakpoint";

export const breakpointList = {
  xs: 0,
  sm: 576,
  md: 769,
  lg: 990,
  xlg: 1024,
  xl: 1270,
  xxl: 1366,
  xxxl: 1980,
};

export const breakpoint = createBreakpoint(breakpointList);

type BreakpointString =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xlg"
  | "xl"
  | "xxl"
  | "xxxl";

type useResponsiveProps = {
  breakpoint?: BreakpointString;
  offset?: number;
  noSsr?: boolean;
};

export const useResponsive = ({
  breakpoint = "md",
  offset = 0,
  noSsr = false,
}: useResponsiveProps): boolean => {
  const isDesktop = useMediaQuery(
    `(min-width:${breakpointList[breakpoint] + offset}px)`,
    { noSsr }
  );
  return isDesktop;
};
