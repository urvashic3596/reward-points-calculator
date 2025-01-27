import React from "react";
import { useHistory } from "react-router-dom";
import Tabs from "./tabs";
import { getMonthName } from "../utils/utilities";
import PropTypes from "prop-types";

const UserMonthlyRewards = ({ rewards, totals }) => {
  const history = useHistory();
  // If totals is a Map, use Array.from() to convert it to an array of entries
  const totalsArray =
    totals instanceof Map
      ? Array.from(totals.entries())
      : Object.entries(totals);
  return (
    <div className="container">
      <Tabs activeTab="monthly-rewards" />
      <div>
        <table data-testid="monthly-rewards-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Month</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {rewards?.map(([key, details]) => (
              <tr
                key={`${details.customerId}-${details.year}-${details.month}`}
              >
                <td className="right-align">{details.customerId}</td>
                <td>{details.name}</td>
                <td className="right-align">{details.year}</td>
                <td>{getMonthName(details.month)}</td>
                <td className="right-align">{details.rewardPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table data-testid="total-rewards-table" className="margin-top">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {totalsArray.map(([name, points]) => (
              <tr key={name}>
                <td>{name}</td>
                <td className="right-align">{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back-btn" onClick={() => history.push("/")}>
        Back
      </button>
    </div>
  );
};

UserMonthlyRewards.propTypes = {
  rewards: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        customerId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        rewardPoints: PropTypes.number.isRequired,
      })
    )
  ),
  totals: PropTypes.oneOfType([
    PropTypes.instanceOf(Map),
    PropTypes.objectOf(PropTypes.number),
  ]),
};

export default UserMonthlyRewards;
