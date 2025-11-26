import { figma } from "@figma/code-connect";
import { Tag } from "./Tag";

/**
 * Code Connect for Tag component
 * Links Figma Tag component to React implementation
 */

figma.connect(
  Tag,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=56-8830",
  {
    props: {
      label: figma.string("Label"),
      scheme: figma.enum("Scheme", {
        Brand: "brand",
        Neutral: "neutral",
        Positive: "positive",
        Danger: "danger",
        Warning: "warning",
      }),
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
      }),
      removable: figma.boolean("Removable"),
    },
    example: ({ label, scheme, variant, removable }) => (
      <Tag
        label={label}
        scheme={scheme}
        variant={variant}
        removable={removable}
      />
    ),
  },
);
