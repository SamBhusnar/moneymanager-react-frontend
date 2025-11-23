import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CustomLineChart({ data, type }) {
  return (
    <div className="w-full h-80 bg-white shadow-md rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3 text-center">
        {type === "Income" ? "Income" : "Expense"} Line Chart
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Light grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Show "month" on X-axis */}
          <XAxis dataKey="month" />

          {/* Auto-scale Y-axis */}
          <YAxis />

          {/* Hover tooltip */}
          <Tooltip
            formatter={(value) => [
              `₹${value.toLocaleString()}`,
              "Total Income",
            ]}
          />

          {/* Main line */}
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#4f46e5" // indigo-600
            strokeWidth={3}
            dot={{ r: 5, fill: "#4f46e5" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;
