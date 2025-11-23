import {
  Trash2,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import React from "react";
import { addThousandSeparator } from "../Util/util";

function TransactionInformation({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  applyData,
}) {
  const getAmountStyles = () => {
    console.log("applyData : ", applyData);
    console.log("TrendingUp : ", <TrendingUp size={18} />);
    console.log("checking eq : ", applyData === <TrendingUp size={18} />);

    return applyData === "up"
      ? "bg-green-50 text-green-800"
      : " bg-red-50 text-red-800 ";
  };
  return (
    <div
      className={`group relative  flex  items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60 mt-2  `}
    >
      <div className="w-12 h-12  rounded-full flex items-center justify-center text-xl text-gray-800 bg-gray-100 ">
        {icon ? (
          <>
            <img src={icon} alt={title} className="w-6 h-6" />
          </>
        ) : (
          <>
            <UtensilsCrossed className="text-purple-800" />
          </>
        )}
      </div>

      <div className="flex-1 flex items-center justify-between ">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-sm text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="
                 text-gray-400 hover:text-red-800 
                 opactity-0 group-hover:opacity-100
                 transition-opacity cursor-pointer   "
            >
              <Trash2 size={18} onClick={onDelete} />
            </button>
          )}
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="text-xs font-medium ">
            {applyData === "up" ? "+" : "-"}${addThousandSeparator(amount)}
          </h6>
          {applyData === "up" ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionInformation;
