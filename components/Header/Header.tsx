import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useAccount, useConnect } from "wagmi";
import { SlMenu } from "react-icons/sl";
import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import { truncateAddress } from "utils/client/truncateAddress";
import styles from "./Header.module.scss";
import Link from "next/link";
import classNames from "classnames";
import Container from "components/Container/Container";
const Drawer = dynamic(() => import("components/Drawer/Drawer"));

const Header = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const connectWallet = () => {
    connect({ connector: connectors[0] });
  };

  const navigationItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Create",
      link: "/create",
    },
    {
      name: "My Tokens",
      link: "/my-tokens",
    },
  ];

  return (
    <>
      <header className={styles.bar}>
        <FlexibleContainer>
          <div className={styles.content}>
            <div className={styles.logoText}>
              <Link href="/">TokenHatchery</Link>
            </div>
            <div className={styles.desktopRight}>
              {navigationItems.map((item) => (
                <div className={styles.menuItem} key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </div>
              ))}
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
        <Container direction="column" gap={16}>
          {navigationItems.map((item) => (
            <div
              className={classNames(styles.menuItem, styles.dark)}
              key={item.name}
            >
              <Link href={item.link}>{item.name}</Link>
            </div>
          ))}
        </Container>
      </Drawer>
    </>
  );
};

export default Header;
