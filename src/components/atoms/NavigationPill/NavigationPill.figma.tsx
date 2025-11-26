import { figma } from "@figma/code-connect";
import { NavigationPill } from "./NavigationPill";

/**
 * Code Connect for NavigationPill component
 * Links Figma NavigationPill component to React implementation
 */

figma.connect(
  NavigationPill,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=7768-19970",
  {
    props: {
      state: figma.enum("State", {
        Default: "Default",
        Active: "Active",
        Hover: "Hover",
      }),
      label: figma.string("Label"),
    },
    example: ({ state, label }) => (
      <NavigationPill state={state} label={label} />
    ),
  },
);
