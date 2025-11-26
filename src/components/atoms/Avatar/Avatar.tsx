"use client";

import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

export type AvatarType = "initial" | "image";
export type AvatarSize = "large" | "medium" | "small";
export type AvatarShape = "circle" | "square";

export interface AvatarProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "type"> {
  initials?: string;
  type?: AvatarType;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      initials = "F",
      type = "image",
      size = "large",
      shape = "circle",
      className,
      alt = "",
      src,
      ...props
    },
    ref,
  ) => {
    const sizeClass = {
      large: "size-[var(--sds-size-icon-large,40px)]",
      medium: "size-[var(--sds-size-icon-medium,32px)]",
      small: "size-[var(--sds-size-icon-small,24px)]",
    }[size];

    const radiusClass =
      shape === "circle"
        ? "rounded-[var(--sds-size-radius-full,9999px)]"
        : size === "small"
          ? "rounded-[var(--sds-size-radius-100,4px)]"
          : "rounded-[var(--sds-size-radius-200,8px)]";

    const textSizeClass = {
      large:
        "text-[length:var(--sds-typography-subheading-size-medium,20px)] leading-[1.2]",
      medium:
        "text-[length:var(--sds-typography-body-size-medium,16px)] leading-[1.4]",
      small:
        "text-[length:var(--sds-typography-body-size-small,14px)] leading-[1.4]",
    }[size];

    if (type === "initial") {
      return (
        <div
          className={cn(
            "bg-[var(--sds-color-background-brand-default,#2c2c2c)]",
            "overflow-clip relative",
            sizeClass,
            radiusClass,
            className,
          )}
        >
          <div
            className={cn(
              "absolute flex flex-col justify-center",
              "left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]",
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-regular,400)]",
              "text-[color:var(--sds-color-text-brand-on-brand,#f5f5f5)]",
              "text-center text-nowrap",
              textSizeClass,
            )}
          >
            <p className="whitespace-pre">{initials}</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "overflow-clip relative",
          sizeClass,
          radiusClass,
          className,
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]",
            sizeClass,
          )}
        >
          <img
            ref={ref}
            src={src}
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            {...props}
            alt={alt}
          />
        </div>
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
