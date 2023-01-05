import { StaticImageData } from "next/image";
import walletConnectIcon from "public/walletconnect.png";
import metamaskIcon from "public/metamask.png";
import coinbaseIcon from "public/coinbase.png";
import ledgerIcon from "public/ledger.png";
import tallyIcon from "public/tally.png";

export const logos: { [key: string]: StaticImageData } = {
  WalletConnect: walletConnectIcon,
  MetaMask: metamaskIcon,
  "Coinbase Wallet": coinbaseIcon,
  Ledger: ledgerIcon,
  Tally: tallyIcon,
};
