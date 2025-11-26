import { figma } from "@figma/code-connect";
import { TextContentHeading } from "./TextContentHeading";

/**
 * Code Connect for TextContentHeading component
 * Links Figma TextContentHeading component to React implementation
 */

figma.connect(
  TextContentHeading,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=2153-7834",
  {
    props: {
      hasSubheading: figma.boolean("Has Subheading"),
      align: figma.enum("Align", {
        Start: "Start",
        Center: "Center",
      }),
    },
    example: ({ hasSubheading, align }) => (
      <TextContentHeading
        heading="Heading"
        subheading="Subheading"
        hasSubheading={hasSubheading}
        align={align}
      />
    ),
  },
);
