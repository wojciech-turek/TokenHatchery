import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  name,
  value,
  onChange,
  type,
  label,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        onWheel={(e) => e.currentTarget.blur()}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
