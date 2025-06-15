"use client";

import React from "react";
import styles from "./flightsList.module.scss";
import { Trip, Suggestion } from "../types";

type FlightsListFProps = {
  tableHeaders: string[];
  suggestions: Suggestion[];
  onClickEvent: (callback: (journeys: Trip[]) => Trip[]) => void;
};

const FlightsList = ({tableHeaders, suggestions, onClickEvent}: FlightsListFProps ) => {
  return (
      <div style={{ overflowX: "auto" }}>
        <table
          className={styles.holidayCalculatorTable}
        >
          <thead>
            <tr style={{ background: "#f1f5fb" }}>
              {tableHeaders.map((header, idx) => (
                <th key={idx} className={styles.tableHeader}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {suggestions.map((suggestion, index) => (
              <tr
                key={index}
                style={{
                  background: index % 2 === 0 ? "#fafbfc" : "#fff"
                }}
              >
                <td data-label={tableHeaders[0]}>{suggestion.name}</td>
                <td data-label={tableHeaders[1]}>{suggestion.vehicle}</td>
                <td data-label={tableHeaders[2]}>£{suggestion.vehicleCost}</td>
                <td data-label={tableHeaders[3]}>{suggestion.outboundRoute}</td>
                <td data-label={tableHeaders[4]}>£{suggestion.outboundCost}</td>
                <td data-label={tableHeaders[5]}>{suggestion.inboundRoute}</td>
                <td data-label={tableHeaders[6]}>£{suggestion.inboundCost}</td>
                <td data-label={tableHeaders[7]} style={{ fontWeight: 600, color: "#1976d2" }}>£{suggestion.totalCost}</td>
                <td data-label={tableHeaders[8]}>
                  <button
                    className={styles.deleteButton}
                    onMouseOver={evt => (evt.currentTarget.style.background = "#fbe9e7")}
                    onMouseOut={evt => (evt.currentTarget.style.background = "transparent")}
                    onClick={() => {
                      onClickEvent(journeys => journeys.filter((_, idx) => idx !== index));
                    }}
                    aria-label="Delete"
                    title="Delete"
                  >
                    &#10005;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default FlightsList;