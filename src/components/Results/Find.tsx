import React, {
  ChangeEvent,
  ReactElement,
  useState,
  useCallback,
  useRef,
} from "react";
import cn from "classnames";
import { X } from "phosphor-react";
import Select, { ValueType, StylesConfig } from "react-select";

import {
  useGlobalUnitsContext,
  GlobalUnitsContextValues,
} from "../useGlobalUnitsContext";

import styles from "./Find.module.scss";

const SEARCH_VARIANCE_OPTIONS = [
  { value: 0, label: "0" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
];

type OptionType = { label: string; value: number };

const customSelectStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    background: "#fff",
    border: 0,
    borderRadius: 6,
    width: 55,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "3px 2px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#746766",
  }),
};

export interface FindProps {
  onSearchChange: (event?: ChangeEvent<HTMLInputElement>) => void;
  onSearchVarianceChange: (value: number) => void;
}

const Find = ({
  onSearchChange,
  onSearchVarianceChange,
}: FindProps): ReactElement => {
  const { units }: GlobalUnitsContextValues = useGlobalUnitsContext();
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleClearSearch = useCallback(() => {
    if (!ref || !ref.current) {
      return;
    }

    onSearchChange();
    ref.current.value = "";
    ref.current.focus();
  }, [onSearchChange]);

  return (
    <div className={styles.find}>
      <span
        className={cn(styles.findInput, {
          [styles.focused]: focused,
        })}
      >
        <input
          id="find-weight-input"
          ref={ref}
          type="text"
          placeholder="Find weight"
          onChange={onSearchChange}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
          className={styles.find}
          title="Find weight"
        />
        <button
          type="button"
          aria-label="Clear search"
          onClick={(): void => handleClearSearch()}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
          className={styles.clearBtn}
        >
          <X size={20} />
        </button>
      </span>
      <span className={styles.separator}>within</span>
      <Select
        id="weight-search-variance"
        options={SEARCH_VARIANCE_OPTIONS}
        defaultValue={SEARCH_VARIANCE_OPTIONS[1]}
        styles={customSelectStyles}
        onChange={(selectedOption: ValueType<OptionType>): void => {
          const { value } = selectedOption as OptionType;
          onSearchVarianceChange(value);
        }}
      />
      <span className={styles.units}>{units}</span>
    </div>
  );
};

export default Find;
