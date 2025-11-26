"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { TestimonialCard } from "../TestimonialCard";
import { TextContentHeading } from "../TextContentHeading";

export interface Testimonial {
  quote: string;
  title: string;
  description: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface CardGridTestimonialsProps
  extends React.HTMLAttributes<HTMLElement> {
  heading?: string;
  subheading?: string;
  hasSubheading?: boolean;
  testimonials?: Testimonial[];
  className?: string;
}

export const CardGridTestimonials = forwardRef<
  HTMLElement,
  CardGridTestimonialsProps
>(
  (
    {
      heading = "What Our Customers Say",
      subheading = "Trusted by teams worldwide",
      hasSubheading = true,
      testimonials = [],
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "flex flex-col content-stretch items-start",
          "gap-[var(--sds-size-space-1200,48px)]",
          "bg-[color:var(--sds-color-background-default-default,#ffffff)]",
          "w-full",

          // Mobile: small padding
          "px-[var(--sds-size-space-600,24px)]",
          "py-[var(--sds-size-space-600,24px)]",

          // Desktop (md: 768px+): large padding
          "md:px-[var(--sds-size-space-1600,64px)]",
          "md:py-[var(--sds-size-space-1600,64px)]",
          className,
        )}
        {...props}
      >
        {/* Text Content Heading */}
        <TextContentHeading
          heading={heading}
          subheading={subheading}
          hasSubheading={hasSubheading}
          align="Start"
          className={cn(
            "w-full",
            // Desktop: limit to 1200px
            "md:w-[1200px]",
          )}
        />

        {/* Testimonial Cards Grid */}
        <div
          className={cn(
            "w-full",

            // Mobile: vertical layout, small gap
            "flex flex-col",
            "gap-[var(--sds-size-space-600,24px)]",

            // Desktop (md: 768px+): 3-column grid, large gap, limit to 1200px
            "md:w-[1200px]",
            "md:grid md:grid-cols-3",
            "md:gap-[var(--sds-size-space-1200,48px)]",
          )}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.title}-${testimonial.quote}`}
              quote={testimonial.quote}
              title={testimonial.title}
              description={testimonial.description}
              avatarSrc={testimonial.avatarSrc}
              avatarAlt={testimonial.avatarAlt}
            />
          ))}
        </div>
      </section>
    );
  },
);

CardGridTestimonials.displayName = "CardGridTestimonials";
