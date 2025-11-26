"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export type TextContentHeadingAlign = "Start" | "Center";

export interface TextContentHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  subheading?: string;
  hasSubheading?: boolean;
  align?: TextContentHeadingAlign;
  className?: string;
}

export const TextContentHeading = forwardRef<
  HTMLDivElement,
  TextContentHeadingProps
>(
  (
    {
      heading = "Heading",
      subheading = "Subheading",
      hasSubheading = true,
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
        {/* Heading */}
        <p
          className={cn(
            "font-[family-name:var(--sds-typography-heading-font-family,'Inter',sans-serif)]",
            "font-[var(--sds-typography-heading-font-weight,600)]",
            "text-[length:var(--sds-typography-heading-size-base,24px)]",
            "leading-[1.2]",
            "tracking-[-0.48px]",
            "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
            "w-full shrink-0",
          )}
        >
          {heading}
        </p>

        {/* Subheading */}
        {hasSubheading && (
          <div
            className={cn(
              "flex flex-col justify-center",
              "font-[family-name:var(--sds-typography-subheading-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-subheading-font-weight,400)]",
              "text-[length:var(--sds-typography-subheading-size-medium,20px)]",
              "leading-[0]",
              "text-[color:var(--sds-color-text-default-secondary,#757575)]",
              "w-full shrink-0",
            )}
          >
            <p className="leading-[1.2]">{subheading}</p>
          </div>
        )}
      </div>
    );
  },
);

TextContentHeading.displayName = "TextContentHeading";
