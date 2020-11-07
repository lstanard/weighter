import React, { ReactElement, MouseEvent } from "react";

import styles from "./Button.module.scss";

export interface ButtonProps {
  id: string;
  onClick: (event: MouseEvent) => null;
  label: string;
}

const Button = ({ id, onClick, label }: ButtonProps): ReactElement => {
  return (
    <button
      id={id}
      type="button"
      onClick={(event: MouseEvent): null => onClick(event)}
      className={styles.button}
    >
      {label}
    </button>
  );
};

export default Button;
