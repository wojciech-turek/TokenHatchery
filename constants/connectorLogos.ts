import { StaticImageData } from "next/image";
import walletConnectIcon from "public/walletconnect40x32.png";
import metamaskIcon from "public/metamask40x32.png";
import coinbaseIcon from "public/coinbase40x32.png";
import ledgerIcon from "public/ledger40x32.png";
import tallyIcon from "public/tally40x32.png";

export const logos: { [key: string]: StaticImageData } = {
  WalletConnect: walletConnectIcon,
  MetaMask: metamaskIcon,
  "Coinbase Wallet": coinbaseIcon,
  Ledger: ledgerIcon,
  Tally: tallyIcon,
};
