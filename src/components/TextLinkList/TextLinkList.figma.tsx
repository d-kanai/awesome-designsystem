import { figma } from "@figma/code-connect";
import { TextLinkList } from "./TextLinkList";

/**
 * Code Connect for TextLinkList component
 * Links Figma Text Link List component to React implementation
 */

figma.connect(
  TextLinkList,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=322-9321",
  {
    example: () => (
      <TextLinkList
        title="Use cases"
        links={[
          { label: "UI design" },
          { label: "UX design" },
          { label: "Wireframing" },
          { label: "Prototyping" },
          { label: "Design systems" },
        ]}
      />
    ),
  },
);
