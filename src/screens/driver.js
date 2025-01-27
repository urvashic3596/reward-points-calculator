import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  calculateRewardPoints,
  getLatestThreeMonths,
  aggregateMonthlyRewards,
  calculateTotalRewards,
} from "../utils/utilities";
import TransactionsTable from "../components/transactions";
import UserMonthlyRewards from "../components/userMonthlyRewards";
import LandingPage from "../components/landingPage";
import { fetchTransactions } from "../services/api";

const Driver = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Calculate the latest data (last 3 months)
    const latestMonths = getLatestThreeMonths();
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(); // Fetch data from API

        // Handle empty data scenario
        data.length ? setIsEmpty(false) : setIsEmpty(true);

        const purchaseData = data.map((transaction) => ({
          ...transaction,
          rewardPoints: calculateRewardPoints(transaction.price),
        }));

        // Full dataset for Transactions Table and Total Rewards
        setTransactions(purchaseData);

        const filteredData = purchaseData.filter((transaction) => {
          const monthYear = transaction?.purchaseDate?.slice(0, 7);
          return latestMonths.includes(monthYear);
        });
        let rewards = aggregateMonthlyRewards(filteredData);
        // Filter out records with 0 reward points
        const filteredRewards = Array.from(rewards.entries()).filter(
          ([key, details]) => details.rewardPoints > 0
        );
        setMonthlyRewards(filteredRewards);
        setTotalRewards(calculateTotalRewards(filteredData));
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
  );

  const sortedMonthlyRewards = [...monthlyRewards].sort(
    ([keyA, detailsA], [keyB, detailsB]) => {
      if (detailsA.name !== detailsB.name) {
        return detailsA.name.localeCompare(detailsB.name); // Sort by name
      }
      const dateA = new Date(detailsA.year, detailsA.month - 1); // Adjust month for 0-based index
      const dateB = new Date(detailsB.year, detailsB.month - 1);
      return dateB - dateA; // Sort by date
    }
  );

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div>
          {error.length ? (
            <div className="error">{error}</div>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/">
                  {" "}
                  <div>
                    <LandingPage hasData={isEmpty} />
                  </div>
                </Route>
                <Route path="/transactions">
                  <div>
                    <h1>Transactions</h1>
                    <TransactionsTable transactions={sortedTransactions} />
                  </div>
                </Route>
                <Route path="/monthly-rewards">
                  <div>
                    <h1>Monthly Rewards</h1>
                    <UserMonthlyRewards
                      rewards={sortedMonthlyRewards}
                      totals={totalRewards}
                    />
                  </div>
                </Route>
              </Switch>
            </Router>
          )}
        </div>
      )}
    </>
  );
};

export default Driver;
