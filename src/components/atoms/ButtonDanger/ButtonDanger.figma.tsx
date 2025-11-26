import { figma } from "@figma/code-connect";
import { ButtonDanger } from "./ButtonDanger";

/**
 * Code Connect for ButtonDanger component
 * Links Figma ButtonDanger component to React implementation
 */

figma.connect(
  ButtonDanger,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=185-852",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "primary",
        Subtle: "subtle",
      }),
      size: figma.enum("Size", {
        Medium: "medium",
        Small: "small",
      }),
      disabled: figma.enum("State", {
        Disabled: true,
        Default: false,
        Hover: false,
      }),
      children: figma.textContent("Button text content"),
    },
    example: ({ variant, size, disabled, children }) => (
      <ButtonDanger variant={variant} size={size} disabled={disabled}>
        {children}
      </ButtonDanger>
    ),
  },
);
