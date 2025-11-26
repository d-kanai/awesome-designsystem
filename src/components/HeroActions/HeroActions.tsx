"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { ButtonGroup } from "../ButtonGroup";
import { TextContentTitle } from "../TextContentTitle";

export interface HeroActionsProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export function HeroActions({
  title,
  subtitle,
  primaryButtonText = "Button",
  secondaryButtonText = "Button",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonHref,
  secondaryButtonHref,
  className,
}: HeroActionsProps) {
  return (
    <section
      className={cn(
        "bg-[var(--sds-color-background-default-secondary,#f5f5f5)]",
        "flex flex-col items-center content-stretch",
        "gap-[var(--sds-size-space-800,32px)]",
        "px-[var(--sds-size-space-600,24px)]",
        "py-[var(--sds-size-space-4000,160px)]",
        "w-full",
        className,
      )}
    >
      {/* Text Content Title */}
      <TextContentTitle title={title} subtitle={subtitle} align="Center" />

      {/* Button Group */}
      <ButtonGroup
        align="Justify"
        size="large"
        startButton={{
          label: secondaryButtonText,
          variant: "neutral",
          onClick: onSecondaryButtonClick,
          href: secondaryButtonHref,
        }}
        endButton={{
          label: primaryButtonText,
          variant: "primary",
          onClick: onPrimaryButtonClick,
          href: primaryButtonHref,
        }}
      />
    </section>
  );
}
