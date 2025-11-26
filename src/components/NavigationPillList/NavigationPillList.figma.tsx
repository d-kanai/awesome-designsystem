import { figma } from "@figma/code-connect";
import { NavigationPillList } from "./NavigationPillList";

/**
 * Code Connect for NavigationPillList component
 * Links Figma NavigationPillList component to React implementation
 */

figma.connect(
  NavigationPillList,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=2194-14984",
  {
    props: {
      direction: figma.enum("Direction", {
        Row: "Row",
        Column: "Column",
      }),
    },
    example: ({ direction }) => (
      <NavigationPillList
        direction={direction}
        items={[
          { label: "Products", state: "Active" },
          { label: "Solutions" },
          { label: "Community" },
          { label: "Resources" },
          { label: "Pricing" },
          { label: "Contact" },
        ]}
      />
    ),
  },
);
