import React, { useEffect, useState } from "react";
import DashBoard from "../Components/DashBoard";
import { useUser } from "../Hooks/useUser";
import InfoCard from "../Components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandSeparator } from "../Util/util";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import RecentTransactions from "../Components/RecentTransactions";
import FianancialOverview from "../Components/fiananceOverview";
import Transactions from "../Components/Transactions";

function Home() {
  useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDashboardData = async () => {
    //fetch dashboard data from backend
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.dashboard_data);

      if (response.status === 200) {
        console.log("dashboard data of sam :", response.data);
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("something went wrong in fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const dashboardasync = async () => {
      await fetchDashboardData();
    };
    dashboardasync();
    console.log("dashboar data viraj : ", dashboardData);

    return () => {};
  }, []);
  return (
    <div>
      <DashBoard activeMenu={"Dashboard"}>
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3     gap-6">
            {/* Display the cards */}
            <InfoCard
              icon={<WalletCards size={28} />}
              label={"Total Balance"}
              value={addThousandSeparator(dashboardData?.totalBalance || 0)}
              color={"bg-purple-800"}
            />
            <InfoCard
              icon={<Wallet size={28} />}
              label={"Total Income"}
              value={addThousandSeparator(dashboardData?.totalIncome || 0)}
              color={"bg-green-800"}
            />

            <InfoCard
              icon={<Coins size={28} />}
              label={"Total Expense"}
              value={addThousandSeparator(dashboardData?.totalExpence || 0)}
              color={"bg-red-800"}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2     gap-6 mt-6">
            {/* recent transactions */}
            <RecentTransactions
              transactions={dashboardData?.RecentTransactions || []}
              onMore={() => navigate("/expense")}
            />
            {/* financial overview chart */}
            <FianancialOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpence={dashboardData?.totalExpence || 0}
            />
            {/* expense transactions */}
            <Transactions
              transactions={dashboardData?.Latest5Expence || []}
              type={"Expense"}
              onMore={() => navigate("/expense")}
              title={"Recent Expenses"}
            />
            {/* income transactions */}
            <Transactions
              transactions={dashboardData?.Latest5Income || []}
              type={"Income"}
              onMore={() => navigate("/income")}
              title={"Recent Incomes"}
            />
          </div>
        </div>
      </DashBoard>
    </div>
  );
}

export default Home;
