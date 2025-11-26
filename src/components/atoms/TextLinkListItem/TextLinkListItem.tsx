"use client";

import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

export interface TextLinkListItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
}

export const TextLinkListItem = forwardRef<
  HTMLButtonElement,
  TextLinkListItemProps
>(({ text = "List item", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-col justify-center",
        "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
        "font-[var(--sds-typography-body-font-weight-regular,400)]",
        "text-[length:var(--sds-typography-body-size-medium,16px)]",
        "leading-[0]",
        "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
        "text-left",
        className,
      )}
      {...props}
    >
      <p className="leading-[1.4] whitespace-pre">{text}</p>
    </button>
  );
});

TextLinkListItem.displayName = "TextLinkListItem";
