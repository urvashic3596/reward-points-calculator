import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Tabs from "../../components/tabs";

describe("Tabs Component", () => {
  const renderTabsComponent = (activeTab) => {
    render(
      <Router>
        <Tabs activeTab={activeTab} />
      </Router>
    );
  };

  test("renders tabs correctly", () => {
    renderTabsComponent("transactions");

    // Check if all the tabs are rendered
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Monthly And Total Rewards")).toBeInTheDocument();
  });

  test("active tab has the correct 'active' class", () => {
    renderTabsComponent("transactions");

    // Check if the 'Transactions' tab has the 'active' class
    expect(screen.getByText("Transactions")).toHaveClass("active");

    // Check if the other tabs do not have the 'active' class
    expect(screen.getByText("Monthly And Total Rewards")).not.toHaveClass("active");
  });

  test("clicking on a tab navigates to the correct path", () => {
    renderTabsComponent("transactions");

    // Simulate clicking on the 'Monthly Rewards' tab
    fireEvent.click(screen.getByText("Monthly And Total Rewards"));
    expect(window.location.pathname).toBe("/monthly-rewards");
  });

  test("tab navigation works correctly when switching between tabs", () => {
    renderTabsComponent("transactions");

    // Clicking on the 'Monthly Rewards' tab should change the path
    fireEvent.click(screen.getByText("Monthly And Total Rewards"));
    expect(window.location.pathname).toBe("/monthly-rewards");
  });
});
