import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useAccount, useConnect } from "wagmi";
import { SlMenu } from "react-icons/sl";
import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import { truncateAddress } from "utils/client/truncateAddress";
import styles from "./Header.module.scss";
const Drawer = dynamic(() => import("components/Drawer/Drawer"));

const Header = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const connectWallet = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <>
      <header className={styles.bar}>
        <FlexibleContainer>
          <div className={styles.content}>
            <div className={styles.logoText}>TokenHatchery</div>
            <div className={styles.desktopRight}>
              <button>Create new token contract</button>
              {!isConnected ? (
                <button onClick={() => connectWallet()}>Connect Wallet</button>
              ) : (
                truncateAddress(address)
              )}
            </div>
            <div className={styles.mobileRight}>
              <SlMenu
                color="white"
                onClick={() => setDrawerOpen(!drawerOpen)}
              />
            </div>
          </div>
        </FlexibleContainer>
      </header>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
        </>
      </Drawer>
    </>
  );
};

export default Header;
