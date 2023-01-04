import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow relative">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
