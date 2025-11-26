import { figma } from "@figma/code-connect";
import { TextContentTitle } from "./TextContentTitle";

/**
 * Code Connect for TextContentTitle component
 * Links Figma TextContentTitle component to React implementation
 */

figma.connect(
  TextContentTitle,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=2153-7838",
  {
    props: {
      hasSubtitle: figma.boolean("Has Subtitle"),
      align: figma.enum("Align", {
        Start: "Start",
        Center: "Center",
      }),
    },
    example: ({ hasSubtitle, align }) => (
      <TextContentTitle
        title="Title"
        subtitle="Subtitle"
        hasSubtitle={hasSubtitle}
        align={align}
      />
    ),
  },
);
