"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export type TextContentTitleAlign = "Start" | "Center";

export interface TextContentTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  hasSubtitle?: boolean;
  align?: TextContentTitleAlign;
  className?: string;
}

export const TextContentTitle = forwardRef<
  HTMLDivElement,
  TextContentTitleProps
>(
  (
    {
      title = "Title",
      subtitle = "Subtitle",
      hasSubtitle = true,
      align = "Start",
      className,
      ...props
    },
    ref,
  ) => {
    const alignmentClasses = {
      Start: "items-start",
      Center: "items-center text-center",
    }[align];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col content-stretch",
          "gap-[var(--sds-size-space-200,8px)]",
          "not-italic",
          alignmentClasses,
          className,
        )}
        {...props}
      >
        {/* Title */}
        <p
          className={cn(
            "font-[family-name:var(--sds-typography-title-hero-font-family,'Inter',sans-serif)]",
            "font-[var(--sds-typography-title-hero-font-weight,700)]",
            "text-[length:var(--sds-typography-title-hero-size,72px)]",
            "leading-[1.2]",
            "tracking-[-2.16px]",
            "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
            "w-full shrink-0",
          )}
        >
          {title}
        </p>

        {/* Subtitle */}
        {hasSubtitle && (
          <div
            className={cn(
              "flex flex-col justify-center",
              "font-[family-name:var(--sds-typography-subtitle-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-subtitle-font-weight,400)]",
              "text-[length:var(--sds-typography-subtitle-size-base,32px)]",
              "leading-[0]",
              "text-[color:var(--sds-color-text-default-secondary,#757575)]",
              "w-full shrink-0",
            )}
          >
            <p className="leading-[1.2]">{subtitle}</p>
          </div>
        )}
      </div>
    );
  },
);

TextContentTitle.displayName = "TextContentTitle";
