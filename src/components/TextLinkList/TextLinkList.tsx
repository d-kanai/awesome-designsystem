"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { TextLinkListItem } from "../atoms/TextLinkListItem";

export interface TextLinkListLinkItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface TextLinkListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  links?: TextLinkListLinkItem[];
  className?: string;
}

export const TextLinkList = forwardRef<HTMLDivElement, TextLinkListProps>(
  ({ title = "Text Strong", links = [], className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start content-stretch",
          "gap-[var(--sds-size-space-300,12px)]",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-start content-stretch gap-[10px] pb-[var(--sds-size-space-400,16px)] pt-0 px-0 w-full">
          <div className="flex items-start content-stretch w-full">
            <p
              className={cn(
                "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
                "font-[var(--sds-typography-body-font-weight-strong,600)]",
                "text-[length:var(--sds-typography-body-size-medium,16px)]",
                "leading-[1.4]",
                "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
                "text-nowrap whitespace-pre",
              )}
            >
              {title}
            </p>
          </div>
        </div>

        {links.map((link) => (
          <TextLinkListItem
            key={link.label}
            text={link.label}
            onClick={link.onClick}
          />
        ))}
      </div>
    );
  },
);

TextLinkList.displayName = "TextLinkList";
