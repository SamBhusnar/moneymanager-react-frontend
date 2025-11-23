import React, { useEffect, useState } from "react";
import DashBoard from "../Components/DashBoard";
import { useUser } from "../Hooks/useUser";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import IncomeList from "../Components/MoneyList";
import Model from "../Components/Model";
import { Plus } from "lucide-react";
import AddIncomeForm from "../Components/AddForm";
import DeleteAlert from "../Components/DeleteAlert";
import IncomeOverview from "../Components/MoneyOverview";

function Income() {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.get_current_month_incomes
      );
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        console.log("income data  by samadhan in fetch method", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("something went wrong", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.get_category_by_type("Income")
      );
      if (response.status === 200) {
        setCategories(response.data);
        console.log("income categories", response.data);
      }
    } catch (error) {
      console.log("failed to fetch income category by type");
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch income category by type"
      );
    }
  };
  // save the income details
  const handleSaveIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount is required");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in future");
      return;
    }
    if (!categoryId) {
      toast.error("Category is required");
      return;
    }
    if (!icon) {
      toast.error("Icon is required");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosConfig.post(API_ENDPOINTS.post_income, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        toast.success("Income added successfully");
        setOpenAddIncomeModel(false);
        fetchIncomeDetails();
      }
    } catch (error) {
      console.error("something went wrong in saving the income", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in saving the income"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = (finalIncome) => {
    console.log("adding income...");
    console.log(finalIncome);
    handleSaveIncome(finalIncome);
  };
  const deleteIncome = async (deleteData) => {
    try {
      setLoading(true);
      const response = await axiosConfig.delete(
        `${API_ENDPOINTS.delete_income(deleteData)}`
      );
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        toast.success("Income deleted successfully");
        setOpenDeleteAlert({ show: false, data: null });
        fetchIncomeDetails();
      }
    } catch (error) {
      console.error("something went wrong in deleting the income", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in deleting the income"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadIncomeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.income_excel_download,
        {
          responseType: "blob",
        }
      );

      console.log(response);
      let fileName = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully ! ");
    } catch (error) {
      console.error("something went wrong in downloading the income", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in downloading the income"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleEmailIncomeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.email_income);
      if (response.status === 200) {
        toast.success("Email sent successfully");
      }
      console.log(response);
    } catch (error) {
      console.error("failed to the emailing the income", error);
      toast.error(
        error?.response?.data?.message || "failed to the emailing the income"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
    console.log("income data by samadhan : ",incomeData)
  }, []);
  return (
    <DashBoard activeMenu={"Income"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with linechart */}

            <IncomeOverview
              onAddIncome={() => setOpenAddIncomeModel(true)}
              transactions={incomeData}
              type={"Income"}
              onAddExpense={null}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
            loading={loading}
            type={"Income"}
          />
          {/* Add model to display the form  */}
          <Model
            isOpen={openAddIncomeModel}
            onClose={() => setOpenAddIncomeModel(false)}
            title="Add Income"
          >
            <AddIncomeForm
              categories={categories}
              onAddIncome={(incomeSelectedData) =>
                handleAddIncome(incomeSelectedData)
              }
              type={"Income"}
              loading={loading}
            />
          </Model>
          {/* Delete Income Model */}
          <Model
            isOpen={openDeleteAlert.show}
            onClose={() =>
              setOpenDeleteAlert({
                show: false,
                data: null,
              })
            }
            title="Delete Income"
          >
            <DeleteAlert
              content={"Are you sure you want to delete this income details ?"}
              onDelete={() => deleteIncome(openDeleteAlert.data)}
              loading={loading}
            />
          </Model>
        </div>
      </div>
    </DashBoard>
  );
}

export default Income;
