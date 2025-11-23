import { Download, LoaderCircle, Mail } from "lucide-react";
import React from "react";
import TransactionInformation from "./TransactionInformation";
import moment from "moment";

import { useState } from "react";
function MoneyList({
  transactions,
  onDelete,
  onDownload,
  onEmail,
  loading,
  type,
}) {
  const [isEmailActive, setEmailActive] = useState(false);
  return (
    <div className="card">
      <div className=" flex items-center justify-between ">
        <h5 className="text-lg">Income Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button
            className="card-btn flex  items-center gap-2 cursor-pointer bg-green-300 hover:bg-green-400  rounded-md  px-3 py-2 "
            onClick={(e) => {
              setEmailActive(true);
              onEmail(e);
            }}
            disabled={loading}
          >
            {loading && isEmailActive ? (
              <span className="flex items-center gap-2 justify-between">
                <LoaderCircle className="animate-spin" />
                <Mail size={15} className="text-base t" />
                Emailing...
              </span>
            ) : (
              <>Email</>
            )}
          </button>
          <button
            className="card-btn flex items-center gap-2 cursor-pointer bg-green-300 hover:bg-green-400 rounded-md  px-3 py-2 "
            onClick={(e) => {
              setEmailActive(false);
              onDownload(e);
            }}
            disabled={loading}
          >
            {loading && !isEmailActive ? (
              <span className="flex items-center gap-2 justify-between">
                <LoaderCircle className="animate-spin" />
                <Download size={15} className="text-base" />
                Downloading...
              </span>
            ) : (
              <>Download</>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 ">
        {/* display the income */}
        {transactions?.map((data) => {
          return (
            <TransactionInformation
              key={data.id}
              icon={data.icon}
              title={data.name}
              date={moment(data.date).format("Do MMMM YYYY")}
              amount={data.amount}
              type={type}
              onDelete={() => onDelete(data.id)}
              hideDeleteBtn={false}
              applyData={type === "Income" ? "up" : "down"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MoneyList;
