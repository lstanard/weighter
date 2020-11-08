import React, { ReactElement, useCallback, useState } from "react";
import Select, { ValueType, StylesConfig } from "react-select";

import { Plates, Barbells } from "../../types";
import ResultsTable from "./ResultsTable";

import styles from "./Results.module.scss";

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

export interface ResultsProps {
  plates: Plates;
  barbells: Barbells;
}

function Results({ plates, barbells }: ResultsProps): ReactElement {
  const [searchValue, setSearchValue] = useState(0);
  const [searchVariance, setSearchVariance] = useState(5);

  const handleFind = useCallback((event) => {
    const { value } = event.currentTarget;
    // NOTE: start search after 1 or 2 characters?
    // if (value.length < 2) {
    //   setSearchValue("");
    //   return;
    // }
    setSearchValue(value);
  }, []);
  const handleSearchVarianceChange = useCallback((value: number) => {
    setSearchVariance(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.resultsHeader}>
        <span className={styles.findInput}>
          <input
            type="text"
            placeholder="Find weight, e.g. 135"
            onChange={handleFind}
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
            handleSearchVarianceChange(value);
          }}
        />
        <span className={styles.units}>lb</span>
      </div>
      <ResultsTable
        plates={plates}
        barbells={barbells}
        searchValue={searchValue}
        searchVariance={searchVariance}
      />
    </div>
  );
}

export default Results;
