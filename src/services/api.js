// src/services/api.js
import logger from "../utils/logger";
const BASE_URL = "/mockData.json"; // Replace with your actual API base URL

// Fetch transactions data
export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      const errorMessage = `Failed to fetch transactions: ${response.status}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    logger.info("Transactions fetched successfully.");
    return data;
  } catch (error) {
    logger.error(
      `Error occurred while fetching transactions: ${error.message}`
    );
    throw error;
  }
};
