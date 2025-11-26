"use client";

import Link from "next/link";
import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Avatar } from "../atoms/Avatar";
import { Button } from "../atoms/Button";
import { ChevronDown } from "../atoms/ChevronDown";

export type HeaderAuthState = "Logged Out" | "Logged In" | "Logged In - Hover";

export interface HeaderAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: HeaderAuthState;
  avatarSrc?: string;
  avatarAlt?: string;
  onSignIn?: () => void;
  onRegister?: () => void;
  onAvatarClick?: () => void;
  signInHref?: string;
  registerHref?: string;
  className?: string;
}

export const HeaderAuth = forwardRef<HTMLDivElement, HeaderAuthProps>(
  (
    {
      state = "Logged Out",
      avatarSrc,
      avatarAlt = "User avatar",
      onSignIn,
      onRegister,
      onAvatarClick,
      signInHref,
      registerHref,
      className,
      ...props
    },
    ref,
  ) => {
    if (state === "Logged In") {
      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          className={cn(
            "flex items-center content-stretch",
            "gap-[var(--sds-size-space-200,8px)]",
            "px-[var(--sds-size-space-300,12px)]",
            "py-[var(--sds-size-space-200,8px)]",
            "rounded-[var(--sds-size-radius-200,8px)]",
            "cursor-pointer",
            className,
          )}
          onClick={onAvatarClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onAvatarClick?.();
            }
          }}
          {...props}
        >
          <Avatar
            type="image"
            size="large"
            shape="circle"
            src={avatarSrc}
            alt={avatarAlt}
            className="shrink-0"
          />
          <ChevronDown size="16" className="shrink-0" />
        </div>
      );
    }

    if (state === "Logged In - Hover") {
      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          className={cn(
            "bg-[var(--sds-color-background-default-default-hover,#f5f5f5)]",
            "flex items-center content-stretch",
            "gap-[var(--sds-size-space-200,8px)]",
            "px-[var(--sds-size-space-300,12px)]",
            "py-[var(--sds-size-space-200,8px)]",
            "rounded-[var(--sds-size-radius-200,8px)]",
            "cursor-pointer",
            className,
          )}
          onClick={onAvatarClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onAvatarClick?.();
            }
          }}
          {...props}
        >
          <Avatar
            type="image"
            size="large"
            shape="circle"
            src={avatarSrc}
            alt={avatarAlt}
            className="shrink-0"
          />
          <ChevronDown size="16" className="shrink-0" />
        </div>
      );
    }

    const renderButtonWithLink = (
      variant: "neutral" | "primary",
      label: string,
      href?: string,
      onClick?: () => void,
    ) => {
      const button = (
        <Button
          variant={variant}
          size="medium"
          onClick={onClick}
          className="w-full"
        >
          {label}
        </Button>
      );

      if (href) {
        return (
          <Link href={href} className="flex-1 basis-0 grow shrink-0 min-w-px min-h-px">
            {button}
          </Link>
        );
      }

      return (
        <div className="flex-1 basis-0 grow shrink-0 min-w-px min-h-px">
          {button}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center content-stretch",
          "gap-[var(--sds-size-space-300,12px)]",
          "w-[178px]",
          className,
        )}
        {...props}
      >
        {renderButtonWithLink("neutral", "Sign in", signInHref, onSignIn)}
        {renderButtonWithLink("primary", "Register", registerHref, onRegister)}
      </div>
    );
  },
);

HeaderAuth.displayName = "HeaderAuth";
