import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/noto-sans";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts = {
  body: "'Noto Sans JP', sans-serif",
  heading: "'Noto Sans JP', sans-serif",
};

const theme = extendTheme({
  config,
  fonts,
});

export default theme;
