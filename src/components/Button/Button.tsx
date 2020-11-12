import React, { ReactElement, MouseEvent } from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

export const BTN_THEME_SECONDARY = "secondary";

export interface ButtonProps {
  /**
   * Unique button ID attribute
   */
  id: string;

  /**
   * onClick handler for the button
   */
  onClick: (event: MouseEvent) => void;

  /**
   * Label value to appear and create aria-label attribute.
   */
  label: string;

  /**
   * Optional value to display in the button, which takes
   * precedence over the label. The label prop
   * will be used as the aria-label for a11y.
   *
   * TODO: want to also be able to use an icon
   */
  value?: string;

  /**
   * Alternate theme (aka styles) to apply
   */
  theme?: typeof BTN_THEME_SECONDARY;

  /**
   * Optional class name to apply
   */
  className?: string;
}

const Button = ({
  id,
  onClick,
  label,
  value,
  theme,
  className,
}: ButtonProps): ReactElement => {
  return (
    <button
      id={id}
      type="button"
      aria-label={label}
      onClick={(event: MouseEvent): void => onClick(event)}
      className={cn(
        styles.button,
        {
          [styles.secondary]: theme === BTN_THEME_SECONDARY,
        },
        className
      )}
    >
      {value || label}
    </button>
  );
};

export default Button;
