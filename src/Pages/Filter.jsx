import React, { useState } from "react";
import { useUser } from "../Hooks/useUser";
import DashBoard from "../Components/DashBoard";
import { Search, TrendingDown, TrendingUp } from "lucide-react";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import TransactionCard from "../Components/TransactionInformation";
import { LoaderCircle } from "lucide-react";
import moment from "moment";

// import momment

function Filter() {
  useUser();
  const [type, setType] = useState("Income");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortFiled, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applyData, setApplyData] = useState(
    <>
      <TrendingUp size={18} />
    </>
  );
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.apply_filters, {
        type,
        startdate,
        enddate,
        keyword,
        sortFiled,
        sortOrder,
      });
      if (response.status === 200) {
        console.log("reserse of filter : ", response.data);

        setTransactions(response.data);
        if (type === "Income") {
          setApplyData("up");
        } else {
          setApplyData("down");
        }
      }
    } catch (error) {
      console.error("something went wrong in applying filters", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in applying filters"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashBoard activeMenu={"Filter"}>
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold ">Filter transactions</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4 ">
            <h5 className="text-lg font-semibold ">Select the filters</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div className=" block text-sm font-medium mb-1">
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
                name=""
                id="type"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="startdate"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <input
                value={startdate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
                type="date"
                name=""
                id="startdate"
              />
            </div>
            <div>
              <label
                htmlFor="enddate"
                className="block text-sm font-medium mb-1"
              >
                End Date
              </label>
              <input
                value={enddate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
                type="date"
                name=""
                id="enddate"
              />
            </div>
            <div>
              <label
                htmlFor="sortorder"
                className="block text-sm font-medium mb-1"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
                name=""
                id="sortorder"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-3 md:col-span-4 flex justify-end">
              <div
                className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
              >
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                >
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    type="text"
                    name=""
                    id="keyword"
                    placeholder="type keyword"
                    className="w-full border rounded px-3 py-2 bg-transparent outline-none"
                  />
                </label>
              </div>
              <div
                className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
              >
                <label
                  htmlFor="sortfield"
                  className="block text-sm font-medium mb-1"
                >
                  <select
                    value={sortFiled}
                    onChange={(e) => setSortField(e.target.value)}
                    className="w-full 
              border rounded px-3 py-2 bg-transparent outline-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
                    name=""
                    id="sortfield"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="category">Category</option>
                  </select>
                </label>
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 mb-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="p-4 card overflow-x-auto">
          <div className="flex items-center justify-between mb-4 ">
            <h5 className="text-lg font-semibold ">Filtered Transactions</h5>
          </div>
          {transactions.length === 0 && !loading ? (
            <>
              <p className="text-sm text-gray-500 ">
                Select the filters and click apply to filter the transactions{" "}
              </p>
            </>
          ) : (
            <></>
          )}
          {loading ? (
            <>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
                <span className="ml-2">Loading...</span>
              </p>
            </>
          ) : (
            <></>
          )}
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              title={transaction.name}
              icon={transaction.icon}
              amount={transaction.amount}
              date={moment(transaction.date).format("Do MM YYYY")}
              type={type}
              hideDeleteBtn={true}
              applyData={applyData}
            />
          ))}
        </div>
      </div>
    </DashBoard>
  );
}

export default Filter;
