import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
