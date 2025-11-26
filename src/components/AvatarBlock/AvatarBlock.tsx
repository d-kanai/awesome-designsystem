"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Avatar, type AvatarShape, type AvatarSize } from "../atoms/Avatar";

export interface AvatarBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarSize?: AvatarSize;
  avatarShape?: AvatarShape;
  className?: string;
}

export const AvatarBlock = forwardRef<HTMLDivElement, AvatarBlockProps>(
  (
    {
      title = "Title",
      description = "Description",
      avatarSrc,
      avatarAlt = "",
      avatarSize = "large",
      avatarShape = "circle",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center content-stretch",
          "gap-[var(--sds-size-space-300,12px)]",
          className,
        )}
        {...props}
      >
        <Avatar
          type="image"
          size={avatarSize}
          shape={avatarShape}
          src={avatarSrc}
          alt={avatarAlt}
        />

        <div className="flex flex-col gap-[var(--sds-size-space-050,2px)] items-start flex-1">
          <p
            className={cn(
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-strong,600)]",
              "text-[length:var(--sds-typography-body-size-medium,16px)]",
              "leading-[1.4]",
              "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
              "w-full",
            )}
          >
            {title}
          </p>

          <p
            className={cn(
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-regular,400)]",
              "text-[length:var(--sds-typography-body-size-small,14px)]",
              "leading-[1.4]",
              "text-[color:var(--sds-color-text-default-secondary,#757575)]",
              "w-full",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    );
  },
);

AvatarBlock.displayName = "AvatarBlock";
