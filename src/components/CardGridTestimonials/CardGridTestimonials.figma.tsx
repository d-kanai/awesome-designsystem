import { figma } from "@figma/code-connect";
import { CardGridTestimonials } from "./CardGridTestimonials";

/**
 * Code Connect for CardGridTestimonials component
 * Links Figma CardGridTestimonials component to React implementation
 */

figma.connect(
  CardGridTestimonials,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=348-13347",
  {
    example: () => (
      <CardGridTestimonials
        heading="Heading"
        subheading="Subheading"
        hasSubheading={true}
        testimonials={[
          {
            quote: "Sample testimonial",
            title: "John Doe",
            description: "CEO, Company",
          },
        ]}
      />
    ),
  },
);
