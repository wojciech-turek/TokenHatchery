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
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
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
import { Analytics } from "@vercel/analytics/react";
import { publicProvider } from "wagmi/providers/public";
import Layout from "components/Layout/Layout";
import Head from "next/head";
import { sagaChainlet } from "constants/supportedNetworks";

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
      evmos,
      evmosTestnet,
      fantom,
      fantomTestnet,
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
  return (
    <>
      <Head>
        <title>TokenHatchery</title>
        <meta name="description" content="Hatch your own tokens!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <WagmiConfig client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
    </>
  );
}
