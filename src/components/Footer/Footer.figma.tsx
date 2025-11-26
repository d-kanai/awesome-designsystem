import { figma } from "@figma/code-connect";
import { Footer } from "./Footer";

/**
 * Code Connect for Footer component
 * Links Figma Footer component to React implementation
 */

figma.connect(
  Footer,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=321-11357",
  {
    example: () => (
      <Footer
        linkSections={[
          {
            title: "Use cases",
            links: [
              { label: "UI design" },
              { label: "UX design" },
              { label: "Wireframing" },
            ],
          },
          {
            title: "Explore",
            links: [{ label: "Design" }, { label: "Prototyping" }],
          },
        ]}
      />
    ),
  },
);
