import { figma } from "@figma/code-connect";
import { HeaderAuth } from "./HeaderAuth";

/**
 * Code Connect for HeaderAuth component
 * Links Figma HeaderAuth component to React implementation
 */

figma.connect(
  HeaderAuth,
  "https://www.figma.com/design/L6MkVNNzgHYqEljdHzs0To/Simple-Design-System--Community-?node-id=18-9389",
  {
    props: {
      state: figma.enum("State", {
        "Logged Out": "Logged Out",
        "Logged In": "Logged In",
        "Logged In - Hover": "Logged In - Hover",
      }),
    },
    example: ({ state }) => (
      <HeaderAuth
        state={state}
        avatarSrc="/avatar.jpg"
        signInHref="/signin"
        registerHref="/register"
      />
    ),
  },
);
