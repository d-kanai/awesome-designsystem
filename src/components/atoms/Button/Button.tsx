"use client";

import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

export type ButtonVariant = "primary" | "neutral" | "subtle";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      // Base styles - using semantic tokens
      "inline-flex items-center justify-center",
      "gap-[var(--sds-size-space-200,8px)]",
      "rounded-[var(--sds-size-radius-200,8px)]",
      "border-solid",
      "border-[length:var(--sds-size-stroke-border,1px)]",
      "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
      "font-[var(--sds-typography-body-font-weight-regular,400)]",
      "text-[length:var(--sds-typography-body-size-medium,16px)]",
      "leading-none",
      "transition-colors duration-200",
      "disabled:cursor-not-allowed",

      // Size variants - using semantic tokens
      size === "large" && "p-[var(--sds-size-space-400,16px)]",
      size === "medium" && "p-[var(--sds-size-space-300,12px)]",
      size === "small" && "p-[var(--sds-size-space-200,8px)]",

      // Variant styles - using semantic tokens
      variant === "primary" && [
        "bg-[var(--sds-color-background-brand-default)] border-[color:var(--sds-color-border-brand-default)] text-[color:var(--sds-color-text-brand-on-brand)]",
        "hover:bg-[var(--sds-color-background-brand-hover)]",
        "disabled:bg-[var(--sds-color-background-disabled-default)] disabled:border-[color:var(--sds-color-border-disabled-default)] disabled:text-[color:var(--sds-color-text-disabled-on-disabled)]",
      ],
      variant === "neutral" && [
        "bg-[var(--sds-color-background-neutral-tertiary)] border-[color:var(--sds-color-border-neutral-secondary)] text-[color:var(--sds-color-text-default-default)]",
        "hover:bg-[var(--sds-color-background-neutral-tertiary-hover)]",
        "disabled:bg-[var(--sds-color-background-disabled-default)] disabled:border-[color:var(--sds-color-border-disabled-default)] disabled:text-[color:var(--sds-color-text-disabled-on-disabled)]",
      ],
      variant === "subtle" && [
        "bg-transparent border-transparent text-[color:var(--sds-color-text-default-default)]",
        "hover:border-[color:var(--sds-color-border-default-default)]",
        "disabled:bg-[var(--sds-color-background-disabled-default)] disabled:border-[color:var(--sds-color-border-disabled-default)] disabled:text-[color:var(--sds-color-text-disabled-on-disabled)]",
      ],

      className,
    );

    return (
      <button ref={ref} className={baseStyles} disabled={disabled} {...props}>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
