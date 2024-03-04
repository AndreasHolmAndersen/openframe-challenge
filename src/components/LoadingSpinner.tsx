import { FC } from "react";
import {
  ComponentSize,
  ComponentSizeClasses,
} from "../models/misc/ComponentSize";

const LoadingSpinner: FC<{ size?: ComponentSize; padding?: string }> = ({
  size,
  padding,
}) => {
  const sizeClasses: ComponentSizeClasses = {
    xs: "h-4 w-4",
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-20 w-20",
    xl: "h-32 w-32",
  };

  return (
    <div className={`flex items-center justify-center ${padding}`}>
      <div
        className={` ${
          size ? sizeClasses[size] : sizeClasses["md"]
        } border-t-2 border-b-2 border-gray-500  rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
