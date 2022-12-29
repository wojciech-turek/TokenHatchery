import React from "react";
import styles from "./Form.module.scss";

const Form = ({
  children,
  onSubmit,
  submitButtonVisible = false,
}: {
  children: React.ReactNode;
  onSubmit?: () => void;
  submitButtonVisible?: boolean;
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
      {submitButtonVisible && <button type="submit">Submit</button>}
    </form>
  );
};

export default Form;
