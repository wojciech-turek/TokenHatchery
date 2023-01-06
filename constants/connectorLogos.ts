import { StaticImageData } from "next/image";
import walletConnectIcon from "public/wallets/walletconnect40x32.png";
import metamaskIcon from "public/wallets/metamask40x32.png";
import coinbaseIcon from "public/wallets/coinbase40x32.png";
import ledgerIcon from "public/wallets/ledger40x32.png";
import tallyIcon from "public/wallets/tally40x32.png";

export const logos: { [key: string]: StaticImageData } = {
  WalletConnect: walletConnectIcon,
  MetaMask: metamaskIcon,
  "Coinbase Wallet": coinbaseIcon,
  Ledger: ledgerIcon,
  Tally: tallyIcon,
};
