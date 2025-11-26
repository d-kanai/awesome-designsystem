"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { AvatarBlock } from "../AvatarBlock";
import { TextContentHeading } from "../TextContentHeading";

export interface TestimonialCardProps {
  quote: string;
  title: string;
  description: string;
  avatarSrc?: string;
  avatarAlt?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  title,
  description,
  avatarSrc,
  avatarAlt = "",
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start",
        "gap-[var(--sds-size-space-600,24px)]",
        "bg-[var(--sds-color-background-default-default,#ffffff)]",
        "border-solid",
        "border-[length:var(--sds-size-stroke-border,1px)]",
        "border-[color:var(--sds-color-border-default-default,#d9d9d9)]",
        "p-[var(--sds-size-space-600,24px)]",
        "rounded-[var(--sds-size-radius-200,8px)]",
        "min-w-[240px]",
        className,
      )}
    >
      {/* Quote */}
      <TextContentHeading
        heading={quote}
        hasSubheading={false}
        align="Start"
        className="w-full"
      />

      {/* Avatar Block */}
      <AvatarBlock
        title={title}
        description={description}
        avatarSrc={avatarSrc}
        avatarAlt={avatarAlt}
        avatarSize="large"
        avatarShape="circle"
        className="w-full"
      />
    </div>
  );
}
