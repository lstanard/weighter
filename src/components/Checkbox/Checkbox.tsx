import React, {
  ReactElement,
  useCallback,
  useState,
  KeyboardEvent,
} from "react";
import cn from "classnames";

import { ENTER, SPACE } from "../../constants/keyCodes";

import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  id: string;
  defaultChecked: boolean;
  className: string;
  onChange: Function;
}

const Checkbox = ({
  id,
  defaultChecked,
  className,
  onChange,
}: CheckboxProps): ReactElement => {
  const [checked, setChecked] = useState(defaultChecked);
  const handleChange = useCallback(() => {
    setChecked(!checked);
    onChange(!checked);
  }, [checked, onChange]);
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ENTER || event.key === SPACE) {
        handleChange();
      }
    },
    [handleChange]
  );

  return (
    <div
      id={`checkbox-${id}`}
      className={cn(styles.container, className)}
      onClick={handleChange}
      onKeyDown={handleKeydown}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
    >
      <input type="checkbox" checked={checked} onChange={(): null => null} />
      <span className={styles.checkbox} />
    </div>
  );
};

export default Checkbox;
