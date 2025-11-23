import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionInformation from "./TransactionInformation";
import moment from "moment";

function RecentTransactions({ onMore, transactions }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Recent Transactions</h4>
        <button
          onClick={onMore}
          className="  card-bt  flex items-center gap-2 bg-gray-200 hover:bg-gray-300 hover:text-black hover:font-semibold rounded-md px-3 py-2"
        >
          More
          <ArrowRight size={15} className="text-base" />
        </button>
      </div>
      <div className="mt-4">
        {transactions?.slice(0, 5)?.map((transaction) => (
          <TransactionInformation
            key={transaction.id}
            icon={transaction.icon}
            title={transaction.name}
            date={moment(transaction.date).format("Do MM YYYY")}
            amount={transaction.amount}
            type={transaction.type}
            hideDeleteBtn={true}
            applyData={transaction.type === "Income" ? "up" : "down"}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
