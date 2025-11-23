import React from "react";
import { addThousandSeparator } from "../Util/util";
import CustomPieChart from "./CustomPieChart";
function FiananceOverview({ totalBalance, totalIncome, totalExpence }) {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expence", amount: totalExpence },
  ];
  const colors = ["#59168B", "#a0090e", "#016630"];
  return (
    <div className="card ">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg font-semibold">Finance Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandSeparator(totalBalance)}`}
        colors={colors}
        showTextAnchor={true}
      />
    </div>
  );
}

export default FiananceOverview;
