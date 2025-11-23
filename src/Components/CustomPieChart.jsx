import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function CustomPieChart({ data, label, totalAmount, colors, showTextAnchor }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Total Amount Center Text */}
      <div className="relative flex items-center justify-center w-full h-full">
        <PieChart width={500} height={400}>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={90}
            paddingAngle={2}
            label={
              showTextAnchor ? ({ name, value }) => `${name}: ${value}` : false
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>

        {/* Center Text */}
        <div className="absolute top-[175px] left-1/2 -translate-x-1/2 text-center font-semibold flex flex-col items-center justify-center">
          <span> {label}</span>
          <span> {totalAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default CustomPieChart;
