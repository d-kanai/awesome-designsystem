"use client";

import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

export type InputFieldState = "default" | "error" | "disabled";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hasLabel?: boolean;
  error?: string;
  hasError?: boolean;
  description?: string;
  hasDescription?: boolean;
  state?: InputFieldState;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hasLabel = true,
      error,
      hasError = false,
      description,
      hasDescription = false,
      state = "default",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Determine actual state based on props
    const actualState = disabled ? "disabled" : hasError ? "error" : state;
    const isError = actualState === "error";
    const isDisabled = actualState === "disabled";

    return (
      <div className="flex flex-col gap-[var(--sds-size-space-200,8px)] items-start">
        {hasLabel && label && (
          <label
            htmlFor={props.id}
            className={cn(
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-regular,400)]",
              "text-[length:var(--sds-typography-body-size-medium,16px)]",
              "leading-[1.4]",
              isDisabled
                ? "text-[color:var(--sds-color-text-disabled-default,#b3b3b3)]"
                : "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
            )}
          >
            {label}
          </label>
        )}

        {hasDescription && description && (
          <p
            className={cn(
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-regular,400)]",
              "text-[length:var(--sds-typography-body-size-medium,16px)]",
              "leading-[1.4]",
              "text-[color:var(--sds-color-text-default-secondary,#757575)]",
            )}
          >
            {description}
          </p>
        )}

        <div
          className={cn(
            "min-w-[240px] w-full relative",
            "rounded-[var(--sds-size-radius-200,8px)]",
            "border-solid",
            "border-[length:var(--sds-size-stroke-border,1px)]",
            isError &&
              "bg-[var(--sds-color-background-default-default,#ffffff)] border-[color:var(--sds-color-border-danger-default,#900b09)]",
            isDisabled &&
              "bg-[var(--sds-color-background-disabled-default,#d9d9d9)] border-[color:var(--sds-color-border-disabled-secondary,#b2b2b2)]",
            !isError &&
              !isDisabled &&
              "bg-[var(--sds-color-background-default-default,#ffffff)] border-[color:var(--sds-color-border-default-default,#d9d9d9)]",
          )}
        >
          <input
            ref={ref}
            disabled={isDisabled}
            className={cn(
              "w-full box-border overflow-clip",
              "px-[var(--sds-size-space-400,16px)] py-[var(--sds-size-space-300,12px)]",
              "rounded-[inherit]",
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-regular,400)]",
              "text-[length:var(--sds-typography-body-size-medium,16px)]",
              "leading-none",
              "bg-transparent border-none outline-none",
              isDisabled &&
                "text-[color:var(--sds-color-text-disabled-on-disabled,#b3b3b3)]",
              !isDisabled &&
                !props.value &&
                !props.defaultValue &&
                "placeholder:text-[color:var(--sds-color-text-default-tertiary,#b3b3b3)]",
              !isDisabled &&
                "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
              className,
            )}
            {...props}
          />
        </div>

        {hasError && error && (
          <p
            className={cn(
              "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
              "font-[var(--sds-typography-body-font-weight-regular,400)]",
              "text-[length:var(--sds-typography-body-size-medium,16px)]",
              "leading-[1.4]",
              isError
                ? "text-[color:var(--sds-color-text-danger-default,#900b09)]"
                : "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
