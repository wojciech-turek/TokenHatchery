import React from "react";
// import styles from "./Container.module.scss";

const Container = ({
  children,
  direction,
  alignItems,
  justifyContent,
  gap,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: number;
}) => {
  return (
    <div
      //   className={styles.container}
      style={{
        display: "flex",
        flexDirection: direction || "row",
        alignItems: alignItems || "center",
        justifyContent: justifyContent || "center",
        gap: gap || 0,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
