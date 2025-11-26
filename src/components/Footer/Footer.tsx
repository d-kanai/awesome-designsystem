"use client";

import Image from "next/image";
import React from "react";
import { cn } from "../../lib/utils";
import { TextLinkList, type TextLinkListLinkItem } from "../TextLinkList";

export interface FooterLinkSectionData {
  title: string;
  links: TextLinkListLinkItem[];
}

export interface SocialLink {
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  label: string;
}

export interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  socialLinks?: SocialLink[];
  linkSections?: FooterLinkSectionData[];
  className?: string;
}

const defaultLinkSections: FooterLinkSectionData[] = [
  {
    title: "Use cases",
    links: [
      { label: "UI design" },
      { label: "UX design" },
      { label: "Wireframing" },
      { label: "Diagramming" },
      { label: "Brainstorming" },
      { label: "Online whiteboard" },
      { label: "Team collaboration" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Design" },
      { label: "Prototyping" },
      { label: "Development features" },
      { label: "Design systems" },
      { label: "Collaboration features" },
      { label: "Design process" },
      { label: "FigJam" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog" },
      { label: "Best practices" },
      { label: "Colors" },
      { label: "Color wheel" },
      { label: "Support" },
      { label: "Developers" },
      { label: "Resource library" },
    ],
  },
];

export function Footer({
  logoSrc,
  logoAlt = "Logo",
  socialLinks = [],
  linkSections = defaultLinkSections,
  className,
}: FooterProps) {
  const renderLogo = () => {
    if (logoSrc) {
      return (
        <div className="relative w-[23.333px] h-[35px] shrink-0">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={24}
            height={35}
            className="block max-w-none size-full"
          />
        </div>
      );
    }
    return (
      <div className="relative w-[23.333px] h-[35px] bg-[var(--sds-color-background-brand-default,#2c2c2c)] rounded-[var(--sds-size-radius-100,4px)]" />
    );
  };

  return (
    <footer
      className={cn(
        "bg-[var(--sds-color-background-default-default,#ffffff)]",
        "border-solid",
        "border-[length:var(--sds-size-stroke-border,1px)]",
        "border-[color:var(--sds-color-border-default-default,#d9d9d9)]",
        "border-t border-l-0 border-r-0 border-b-0",
        "w-full",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-wrap content-start items-start",
          "gap-[var(--sds-size-space-400,16px)]",
          "overflow-clip",
          "px-[var(--sds-size-space-800,32px)]",
          "pt-[var(--sds-size-space-800,32px)]",
          "pb-[var(--sds-size-space-4000,160px)]",
        )}
      >
        {/* Logo and Social Links */}
        <div className="flex flex-col items-start content-stretch gap-[var(--sds-size-space-600,24px)] shrink-0 min-w-[240px] w-[262px]">
          {/* Logo */}
          {renderLogo()}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center content-stretch gap-[var(--sds-size-space-400,16px)]">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  onClick={social.onClick}
                  aria-label={social.label}
                  className="relative shrink-0 size-[24px]"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Link Sections */}
        {linkSections.map((section) => (
          <TextLinkList
            key={section.title}
            title={section.title}
            links={section.links}
            className="shrink-0 w-[262px]"
          />
        ))}
      </div>
    </footer>
  );
}
