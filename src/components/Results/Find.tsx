import React, { ChangeEvent, ReactElement } from "react";
import Select, { ValueType, StylesConfig } from "react-select";

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
  onSearchChange: (event: ChangeEvent) => void;
  onSearchVarianceChange: (value: number) => void;
}

const Find = ({
  onSearchChange,
  onSearchVarianceChange,
}: FindProps): ReactElement => {
  return (
    <div className={styles.find}>
      <span className={styles.findInput}>
        <input
          type="text"
          placeholder="Find weight, e.g. 135"
          onChange={onSearchChange}
          className={styles.find}
          title="Find weight, e.g. 135"
        />
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
      <span className={styles.units}>lb</span>
    </div>
  );
};

export default Find;
