import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionInformation from "./TransactionInformation";
import moment from "moment";

function Transactions({ transactions, onMore, type, title }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">{title}</h5>
        <button className="card-bt  flex items-center gap-2 bg-gray-200 hover:bg-gray-300 hover:text-black hover:font-semibold rounded-md px-3 py-2" type="submit" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.map((transaction) => (
          <TransactionInformation
            key={transaction.id}
            icon={transaction.icon}
            title={transaction.name}
            date={moment(transaction.date).format("Do MM YYYY")}
            amount={transaction.amount}
            type={type}
            hideDeleteBtn={true}
            applyData={type === "Income" ? "up" : "down"}
          />
        ))}
      </div>
    </div>
  );
}

export default Transactions;
