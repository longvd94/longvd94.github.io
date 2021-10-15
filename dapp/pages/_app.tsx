import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import PegaxyProvider from "../containers/Account/Pegaxy";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <PegaxyProvider>
        <Component {...pageProps} />
      </PegaxyProvider>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
