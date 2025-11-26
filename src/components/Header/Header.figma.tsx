import { figma } from "@figma/code-connect";
import { Header } from "./Header";

/**
 * Code Connect for Header component
 * Links Figma Header component to React implementation
 */

figma.connect(
  Header,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=2287-22651",
  {
    props: {
      platform: figma.enum("Platform", {
        Desktop: "Desktop",
        Mobile: "Mobile",
      }),
      state: figma.enum("State", {
        Default: "Default",
        Open: "Open",
      }),
    },
    example: ({ platform, state }) => (
      <Header
        navigationItems={[
          { label: "Products", isActive: true },
          { label: "Solutions" },
          { label: "Community" },
          { label: "Resources" },
          { label: "Pricing" },
          { label: "Contact" },
          { label: "Link" },
        ]}
      />
    ),
  },
);
