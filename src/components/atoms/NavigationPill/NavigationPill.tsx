"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export type NavigationPillState = "Default" | "Active" | "Hover";

export interface NavigationPillProps {
  label?: string;
  state?: NavigationPillState;
  onClick?: () => void;
  className?: string;
}

export function NavigationPill({
  label = "Link",
  state = "Default",
  onClick,
  className,
}: NavigationPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center content-stretch",
        "gap-[var(--sds-size-space-200,8px)]",
        "p-[var(--sds-size-space-200,8px)]",
        "rounded-[var(--sds-size-radius-200,8px)]",
        state === "Active" &&
          "bg-[var(--sds-color-background-brand-tertiary,#f5f5f5)]",
        state === "Hover" &&
          "bg-[var(--sds-color-background-default-default-hover,#f5f5f5)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center",
          "font-[family-name:var(--sds-typography-body-font-family,'Inter',sans-serif)]",
          "font-[var(--sds-typography-body-font-weight-regular,400)]",
          "text-[length:var(--sds-typography-body-size-medium,16px)]",
          "leading-[0]",
          "text-nowrap",
          state === "Active"
            ? "text-[color:var(--sds-color-text-brand-on-brand-secondary,#1e1e1e)]"
            : "text-[color:var(--sds-color-text-default-default,#1e1e1e)]",
        )}
      >
        <p className="leading-none whitespace-pre">{label}</p>
      </div>
    </button>
  );
}
