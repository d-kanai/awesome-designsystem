"use client";

import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { HeaderAuth, type HeaderAuthState } from "../HeaderAuth";
import {
  NavigationPillList,
  type NavigationPillListItem,
} from "../NavigationPillList";

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  navigationItems?: NavigationItem[];
  authState?: HeaderAuthState;
  avatarSrc?: string;
  avatarAlt?: string;
  onSignIn?: () => void;
  onRegister?: () => void;
  onAvatarClick?: () => void;
  signInHref?: string;
  registerHref?: string;
  className?: string;
}

const defaultNavigationItems: NavigationItem[] = [
  { label: "Products", isActive: true },
  { label: "Solutions" },
  { label: "Community" },
  { label: "Resources" },
  { label: "Pricing" },
  { label: "Contact" },
  { label: "Link" },
];

export function Header({
  logoSrc,
  logoAlt = "Logo",
  navigationItems = defaultNavigationItems,
  authState = "Logged Out",
  avatarSrc,
  avatarAlt,
  onSignIn,
  onRegister,
  onAvatarClick,
  signInHref,
  registerHref,
  className,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pillItems: NavigationPillListItem[] = navigationItems.map((item) => ({
    label: item.label,
    state: item.isActive ? "Active" : "Default",
    onClick: item.onClick,
  }));

  const renderLogo = () => {
    if (logoSrc) {
      return (
        <div className="relative w-[40px] h-[35px] shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={40}
            height={35}
            className="block max-w-none size-full"
          />
        </div>
      );
    }
    return (
      <div className="relative w-[40px] h-[35px] bg-[var(--sds-color-background-brand-default,#2c2c2c)] rounded-[var(--sds-size-radius-100,4px)]" />
    );
  };

  return (
    <>
      <header
        className={cn(
          "bg-[var(--sds-color-background-default-default,#ffffff)]",
          "border-solid",
          "border-[length:var(--sds-size-stroke-border,1px)]",
          "border-[color:var(--sds-color-border-default-default,#d9d9d9)]",
          "border-b border-l-0 border-r-0 border-t-0",
          "w-full",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center",
            "justify-between",
            "p-[var(--sds-size-space-600,24px)]",
            "md:flex-wrap md:content-center",
            "md:gap-[var(--sds-size-space-600,24px)]",
            "md:p-[var(--sds-size-space-800,32px)]",
          )}
        >
          <div className="flex items-center gap-[24px] shrink-0">
            {renderLogo()}
          </div>

          <NavigationPillList
            items={pillItems}
            direction="Row"
            className={cn(
              "hidden",
              "md:flex md:flex-1 md:basis-0 md:grow md:shrink-0 md:min-w-px md:min-h-px md:justify-end",
            )}
          />

          <HeaderAuth
            state={authState}
            avatarSrc={avatarSrc}
            avatarAlt={avatarAlt}
            onSignIn={onSignIn}
            onRegister={onRegister}
            onAvatarClick={onAvatarClick}
            signInHref={signInHref}
            registerHref={registerHref}
            className={cn("hidden", "md:flex md:shrink-0")}
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "flex items-center justify-center overflow-clip",
              "p-[var(--sds-size-space-200,8px)]",
              "rounded-[32px] shrink-0",
              "md:hidden",
            )}
            aria-label="Toggle menu"
          >
            <div className="overflow-clip relative shrink-0 size-[16px]">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="size-full"
              >
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--sds-color-background-default-default,#ffffff)] z-50 flex flex-col gap-[var(--sds-size-space-1600,64px)] items-center px-[var(--sds-size-space-600,24px)] py-[var(--sds-size-space-800,32px)] md:hidden">
          <div className="flex items-center justify-between w-full shrink-0">
            <div className="flex items-center gap-[24px]">
              {renderLogo()}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-[var(--sds-size-space-200,8px)] overflow-clip p-[var(--sds-size-space-300,12px)] rounded-[32px] shrink-0 size-[40px]"
              aria-label="Close menu"
            >
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="size-full"
                >
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          <NavigationPillList
            items={pillItems.map((item) => ({
              ...item,
              onClick: () => {
                item.onClick?.();
                setMobileMenuOpen(false);
              },
            }))}
            direction="Column"
            className="flex-1 basis-0 grow shrink-0 min-h-px min-w-px items-end w-full"
          />

          <HeaderAuth
            state={authState}
            avatarSrc={avatarSrc}
            avatarAlt={avatarAlt}
            onSignIn={() => {
              onSignIn?.();
              setMobileMenuOpen(false);
            }}
            onRegister={() => {
              onRegister?.();
              setMobileMenuOpen(false);
            }}
            onAvatarClick={() => {
              onAvatarClick?.();
              setMobileMenuOpen(false);
            }}
            signInHref={signInHref}
            registerHref={registerHref}
            className="shrink-0 w-full"
          />
        </div>
      )}
    </>
  );
}
