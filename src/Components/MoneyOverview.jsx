import React, { useEffect, useState } from "react";
import {
  prepareExpenseLineChartData,
  prepareIncomeLineChartData,
} from "../Util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

function MoneyOverview({ transactions, onAddIncome, type, onAddExpense }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function load() {
      if (type === "Expense") {
        const result = await prepareExpenseLineChartData(transactions);
        console.log("result : ", result);
        setChartData(result);
        return;
      }
      if (type === "Income") {
        const result = await prepareIncomeLineChartData(transactions);

        console.log("result : ", result);
        setChartData(result);
      }
    }
    load();
  }, [transactions]);
  return (
    <div className="card  ">
      <div className="flex items-center justify-between ">
        <div>
          {" "}
          <h5 className="text-lg">
            {type === "Income" ? "Income" : "Expense"} Overview
          </h5>
          <p className="text-xl text-gray-400 mt-1">
            Track your {type === "Income" ? "earning" : "Expenses"} overtime
            and analyze your {type === "Income" ? "Income" : "Expense"} trends
          </p>
        </div>
        <button
          onClick={() => {
            if (type === "Income") {
              onAddIncome();
            } else {
              onAddExpense();
            }
          }}
          className="flex items-center gap-2 cursor-pointer text-gray-600 h-9 px-4   hover:text-gray-800 font-semibold  bg-green-300 rounded-md justify-evenly"
        >
          <Plus size={15} className="text-lg" />
          Add {type === "Income" ? "Income" : "Expense"}
        </button>
      </div>
      <div className="mt-10 ">
        {/* create line chart */}

        <CustomLineChart data={chartData} type={type} />
      </div>
    </div>
  );
}

export default MoneyOverview;
