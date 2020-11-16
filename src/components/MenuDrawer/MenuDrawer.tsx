import React, { useState, ReactElement } from "react";
import cn from "classnames";
import { Barbell, X } from "phosphor-react";

import styles from "./MenuDrawer.module.scss";

export interface MenuDrawerProps {
  /**
   * A ReactElement to be rendered as the contents of the
   * drawer menu on mobile.
   */
  children: ReactElement;
}

const MenuDrawer = ({ children }: MenuDrawerProps): ReactElement => {
  const [drawerVisible, setDrawerVisibility] = useState(false);

  return (
    <>
      <button
        className={styles.menuBtn}
        aria-label="Open menu"
        onClick={(): void => setDrawerVisibility(!drawerVisible)}
      >
        <X
          size={36}
          className={cn(styles.icon, {
            [styles.visible]: drawerVisible,
          })}
        />
        <Barbell
          size={36}
          className={cn(styles.icon, {
            [styles.visible]: !drawerVisible,
          })}
        />
      </button>
      <div
        className={cn(styles.drawer, {
          [styles.visible]: drawerVisible,
        })}
      >
        {children}
      </div>
      <div
        className={cn(styles.overlay, {
          [styles.visible]: drawerVisible,
        })}
      ></div>
    </>
  );
};

export default MenuDrawer;
