import { UserProvider } from "@/provider/UserProvider";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import theme from "../libs/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserProvider>
        <ChakraProvider theme={extendTheme(theme)}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </RecoilRoot>
  );
}
