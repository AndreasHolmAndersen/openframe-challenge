export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ComponentSizeClasses = {
  [key in ComponentSize]: string;
};
