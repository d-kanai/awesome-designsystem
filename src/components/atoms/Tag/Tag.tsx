"use client";

import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

export type TagScheme = "brand" | "neutral" | "positive" | "danger" | "warning";
export type TagVariant = "primary" | "secondary";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  scheme?: TagScheme;
  variant?: TagVariant;
  removable?: boolean;
  onRemove?: () => void;
}

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      label = "Tag",
      scheme = "brand",
      variant = "primary",
      removable = false,
      onRemove,
      className,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center",
      "gap-[var(--sds-size-space-200,8px)]",
      "p-[var(--sds-size-space-200,8px)]",
      "rounded-[var(--sds-size-radius-200,8px)]",
      "transition-colors duration-200",

      scheme === "brand" &&
        variant === "primary" && [
          "bg-[var(--sds-color-background-brand-default,#2c2c2c)]",
          "text-[color:var(--sds-color-text-brand-on-brand,#f5f5f5)]",
          "hover:bg-[var(--sds-color-background-brand-hover,#1e1e1e)]",
        ],

      scheme === "brand" &&
        variant === "secondary" && [
          "bg-[var(--sds-color-background-brand-tertiary,#f5f5f5)]",
          "text-[color:var(--sds-color-text-brand-on-brand-tertiary,#2c2c2c)]",
          "hover:bg-[var(--sds-color-background-brand-tertiary-hover,#e6e6e6)]",
        ],

      scheme === "danger" &&
        variant === "primary" && [
          "bg-[var(--sds-color-background-danger-default,#ec221f)]",
          "text-[color:var(--sds-color-text-danger-on-danger,#fee9e7)]",
          "hover:bg-[var(--sds-color-background-danger-hover,#c00f0c)]",
        ],

      scheme === "danger" &&
        variant === "secondary" && [
          "bg-[var(--sds-color-background-danger-secondary,#fdd3d0)]",
          "text-[color:var(--sds-color-text-danger-on-danger-secondary,#900b09)]",
          "hover:bg-[var(--sds-color-background-danger-secondary-hover,#fcb3ad)]",
        ],

      scheme === "positive" &&
        variant === "primary" && [
          "bg-[var(--sds-color-background-positive-default,#14ae5c)]",
          "text-[color:var(--sds-color-text-positive-on-positive,#ebffee)]",
          "hover:bg-[var(--sds-color-background-positive-hover,#009951)]",
        ],

      scheme === "positive" &&
        variant === "secondary" && [
          "bg-[var(--sds-color-background-positive-secondary,#cff7d3)]",
          "text-[color:var(--sds-color-text-positive-on-positive-secondary,#02542d)]",
          "hover:bg-[var(--sds-color-background-positive-secondary-hover,#aff4c6)]",
        ],

      scheme === "warning" &&
        variant === "primary" && [
          "bg-[var(--sds-color-background-warning-default,#e8b931)]",
          "text-[color:var(--sds-color-text-warning-on-warning,#401b01)]",
          "hover:bg-[var(--sds-color-background-warning-hover,#e5a000)]",
        ],

      scheme === "warning" &&
        variant === "secondary" && [
          "bg-[var(--sds-color-background-warning-default,#e8b931)]",
          "text-[color:var(--sds-color-text-warning-on-warning,#401b01)]",
          "hover:bg-[var(--sds-color-background-warning-secondary-hover,#ffe8a3)] hover:text-[color:var(--sds-color-text-warning-on-warning-secondary,#682d03)]",
        ],

      scheme === "neutral" &&
        variant === "primary" && [
          "bg-[var(--sds-color-background-default-tertiary,#d9d9d9)]",
          "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
          "hover:bg-[var(--sds-color-background-default-tertiary-hover,#b3b3b3)]",
        ],

      scheme === "neutral" &&
        variant === "secondary" && [
          "bg-[var(--sds-color-background-default-secondary,#f5f5f5)]",
          "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
          "hover:bg-[var(--sds-color-background-default-secondary-hover,#e6e6e6)]",
        ],

      className,
    );

    const textStyles = cn(
      "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
      "font-[var(--sds-typography-body-font-weight-regular,400)]",
      "text-[length:var(--sds-typography-body-size-medium,16px)]",
      "leading-none",
      "whitespace-nowrap",
    );

    const iconColor =
      scheme === "brand" && variant === "primary"
        ? "#f5f5f5"
        : scheme === "brand" && variant === "secondary"
          ? "#2c2c2c"
          : scheme === "danger" && variant === "primary"
            ? "#fee9e7"
            : scheme === "danger" && variant === "secondary"
              ? "#900b09"
              : scheme === "positive" && variant === "primary"
                ? "#ebffee"
                : scheme === "positive" && variant === "secondary"
                  ? "#02542d"
                  : scheme === "warning" && variant === "primary"
                    ? "#401b01"
                    : scheme === "warning" && variant === "secondary"
                      ? "#401b01"
                      : "#1e1e1e";

    return (
      <div ref={ref} className={baseStyles} {...props}>
        <span className={textStyles}>{label}</span>
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove tag"
            className="flex-shrink-0 size-[16px] cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Remove</title>
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke={iconColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Tag.displayName = "Tag";
