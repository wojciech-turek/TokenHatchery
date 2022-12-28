import "styles/reset.scss";
import "styles/variables.scss";
import "styles/global.scss";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { bsc, bscTestnet, mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import Layout from "components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [mainnet, goerli, bsc, bscTestnet],
    [publicProvider()]
  );

  const client = createClient({
    connectors: [new InjectedConnector({ chains })],
    provider,
  });
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
}
