"use client";

import Link from "next/link";
import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/Button";

export type ButtonGroupAlign = "Justify" | "Start" | "End" | "Center" | "Stack";

export interface ButtonGroupButton {
  label: string;
  variant?: "primary" | "neutral";
  onClick?: () => void;
  href?: string;
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: ButtonGroupAlign;
  size?: "small" | "medium" | "large";
  startButton?: ButtonGroupButton;
  endButton?: ButtonGroupButton;
  className?: string;
}

const defaultStartButton: ButtonGroupButton = {
  label: "Button",
  variant: "neutral",
};

const defaultEndButton: ButtonGroupButton = {
  label: "Button",
  variant: "primary",
};

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      align = "Justify",
      size = "medium",
      startButton = defaultStartButton,
      endButton = defaultEndButton,
      className,
      ...props
    },
    ref,
  ) => {
    const renderButton = (
      button: ButtonGroupButton,
      buttonClassName?: string,
    ) => {
      const buttonElement = (
        <Button
          variant={button.variant || "neutral"}
          size={size}
          onClick={button.onClick}
          className={buttonClassName}
        >
          {button.label}
        </Button>
      );

      if (button.href) {
        return (
          <Link href={button.href} className={buttonClassName}>
            {buttonElement}
          </Link>
        );
      }

      return buttonElement;
    };

    if (align === "Stack") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-start justify-center content-stretch",
            "gap-[var(--sds-size-space-400,16px)]",
            "w-[240px]",
            className,
          )}
          {...props}
        >
          {startButton && renderButton(startButton, "w-full")}
          {endButton && renderButton(endButton, "w-full")}
        </div>
      );
    }

    const justifyClass = {
      Justify: "",
      Start: "",
      End: "justify-end",
      Center: "justify-center",
    }[align];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center content-stretch",
          "gap-[var(--sds-size-space-400,16px)]",
          "w-[240px]",
          justifyClass,
          className,
        )}
        {...props}
      >
        {startButton &&
          renderButton(
            startButton,
            cn(
              align === "Justify" &&
                "flex-1 basis-0 grow shrink-0 min-w-px min-h-px",
              align !== "Justify" && "shrink-0",
            ),
          )}
        {endButton &&
          renderButton(
            endButton,
            cn(
              align === "Justify" &&
                "flex-1 basis-0 grow shrink-0 min-w-px min-h-px",
              align !== "Justify" && "shrink-0",
            ),
          )}
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";
