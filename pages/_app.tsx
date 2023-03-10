import "styles/global.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import {
  bsc,
  bscTestnet,
  mainnet,
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  gnosis,
  polygon,
  polygonMumbai,
  optimism,
  optimismGoerli,
} from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { LedgerConnector } from "wagmi/connectors/ledger";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import Layout from "components/Layout/Layout";
import Head from "next/head";
import { sagaChainlet } from "constants/supportedNetworks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider, webSocketProvider } = configureChains(
    [
      mainnet,
      goerli,
      bsc,
      bscTestnet,
      arbitrum,
      arbitrumGoerli,
      avalanche,
      avalancheFuji,
      gnosis,
      polygon,
      polygonMumbai,
      optimism,
      optimismGoerli,
      sagaChainlet,
    ],
    [publicProvider()]
  );

  const client = createClient({
    connectors: [
      new InjectedConnector({ chains }),
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains: chains,
        options: { appName: "TokenHatchery" },
      }),
      new WalletConnectConnector({ chains, options: { qrcode: true } }),
      new LedgerConnector({ chains }),
    ],
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>TokenHatchery</title>
        <meta
          property="og:image"
          content={"https://tokenhatchery.com/ogimage.jpg"}
        />
        <meta
          name="description"
          content="TokenHatchery is a token deployer and manager supporting standards like ERC20, ERC721 and ERC1155. Create a contract, mint new tokens and view statistics all in one place."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <WagmiConfig client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
}
