import React from "react";

function InfoCard({ icon, label, value, color }) {
  return (
    <div
      className="flex gap-6 bg-white p-4 rounded-lg shadow-md
  shadow-gray-100
  border border-gray-200/50
   "
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-[26px] text-white ${color} drop-shadow-xl `}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px]">&#8377;{value}</span>
      </div>
    </div>
  );
}

export default InfoCard;
