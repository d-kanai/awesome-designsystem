"use client";

import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

export type ChevronDownSize = "16" | "20" | "24" | "32" | "40" | "48";

export interface ChevronDownProps extends React.SVGProps<SVGSVGElement> {
  size?: ChevronDownSize;
  className?: string;
}

export const ChevronDown = forwardRef<SVGSVGElement, ChevronDownProps>(
  ({ size = "16", className, ...props }, ref) => {
    const sizeValue = Number.parseInt(size, 10);

    return (
      <svg
        ref={ref}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={cn("shrink-0", className)}
        style={{ width: sizeValue, height: sizeValue }}
        {...props}
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="var(--sds-color-icon-default-default,#1e1e1e)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

ChevronDown.displayName = "ChevronDown";
