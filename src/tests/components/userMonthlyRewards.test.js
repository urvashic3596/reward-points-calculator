import React from "react";
import { render, screen, within} from "@testing-library/react";
import UserMonthlyRewards from "../../components/userMonthlyRewards";
import { BrowserRouter } from "react-router-dom";  // Ensure this import
import { getMonthName } from "../../utils/utilities";
import { MemoryRouter } from "react-router-dom"; // To handle routing in tests

// Mocking the getMonthName function
jest.mock("../../utils/utilities", () => ({
  getMonthName: jest.fn().mockReturnValue("January"),
}));

describe("UserMonthlyRewards", () => {
  const mockRewards = [
    [
      "1",
      {
        customerId: 1,
        name: "John Doe",
        year: 2025,
        month: 1,
        rewardPoints: 100,
      },
    ],
  ];

  const mockTotals = {
    "John Doe": 1000,
  };

  const setup = () =>
    render(
      <BrowserRouter> 
        <UserMonthlyRewards rewards={mockRewards} totals={mockTotals} />
      </BrowserRouter>
    );

    test("renders UserMonthlyRewards component", () => {
      setup();
  
      expect(screen.getByTestId("monthly-rewards-table")).toBeInTheDocument();
      expect(screen.getByTestId("total-rewards-table")).toBeInTheDocument();
    });
 
    test("renders the correct month name from getMonthName", () => {
      setup();
  
      // Check if getMonthName was called with the correct month value (1 for January)
      expect(require("../../utils/utilities").getMonthName).toHaveBeenCalledWith(1);
      expect(require("../../utils/utilities").getMonthName).toHaveBeenCalledTimes(1);
    });
});

