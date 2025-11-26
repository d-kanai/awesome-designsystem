import { figma } from "@figma/code-connect";
import { TextLinkListItem } from "./TextLinkListItem";

/**
 * Code Connect for TextLinkListItem component
 * Links Figma Text Link List Item component to React implementation
 */

figma.connect(
  TextLinkListItem,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=2153-7973",
  {
    props: {
      text: figma.string("Text"),
    },
    example: ({ text }) => <TextLinkListItem text={text} />,
  },
);
