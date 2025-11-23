import React, { useEffect, useState } from "react";
import DashBoard from "../Components/DashBoard";
import { useUser } from "../Hooks/useUser";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import ExpenseList from "../Components/MoneyList";
import Model from "../Components/Model";
import { Plus } from "lucide-react";
import AddExpenseForm from "../Components/AddForm";
import DeleteAlert from "../Components/DeleteAlert";
import ExpenseOverview from "../Components/MoneyOverview";

function Expense() {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.get_current_month_expenses
      );
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        console.log("expense data ", response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("something went wrong", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.get_category_by_type("Expense")
      );
      if (response.status === 200) {
        setCategories(response.data);
        console.log("expense categories", response.data);
      }
    } catch (error) {
      console.log("failed to fetch  expense category by type");
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch  expense category by type"
      );
    }
  };
  // save the income details

  const handleSaveExpense = async (income) => {
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
      const response = await axiosConfig.post(API_ENDPOINTS.post_expense, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModel(false);
        fetchExpenseDetails();
      }
    } catch (error) {
      console.error("something went wrong in saving the expense", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in saving the expense"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = (finalExpense) => {
    console.log("adding  expense...");
    console.log(finalExpense);
    handleSaveExpense(finalExpense);
  };

  const deleteExpense = async (deleteData) => {
    try {
      setLoading(true);
      const response = await axiosConfig.delete(
        `${API_ENDPOINTS.delete_expense(deleteData)}`
      );
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        toast.success(" Expense deleted successfully");
        setOpenDeleteAlert({ show: false, data: null });
        fetchExpenseDetails();
      }
    } catch (error) {
      console.error("something went wrong in deleting the  expense", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in deleting the  expense"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.expense_excel_download,
        {
          responseType: "blob",
        }
      );

      console.log(response);
      let fileName = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(" Expense details downloaded successfully ! ");
    } catch (error) {
      console.error("something went wrong in downloading the  expense", error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong in downloading the  expense"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailExpenseDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.email_expense);
      if (response.status === 200) {
        toast.success("Email sent successfully");
      }
      console.log(response);
    } catch (error) {
      console.error("failed to the emailing the expense", error);
      toast.error(
        error?.response?.data?.message || "failed to the emailing the expense"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);
  return (
    <DashBoard activeMenu={"Expense"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with linechart */}

            <ExpenseOverview
              onAddExpense={() => setOpenAddExpenseModel(true)}
              transactions={expenseData}
              type={"Expense"}
              onAddIncome={null}
            />
          </div>
          {/* -------------------------- */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
            loading={loading}
            type={"Expense"}
          />
          {/* Add model to display the form  */}
          <Model
            isOpen={openAddExpenseModel}
            onClose={() => setOpenAddExpenseModel(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              categories={categories}
              onAddExpense={(expenseSelectedData) =>
                handleAddExpense(expenseSelectedData)
              }
              onAddIncome={null}
              loading={loading}
              type={"Expense"}
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
            title="Delete  Expense"
          >
            {/* ----------------------------- */}
            <DeleteAlert
              content={`Are you sure you want to delete this expense details ?`}
              onDelete={() => deleteExpense(openDeleteAlert.data)}
              loading={loading}
            />
          </Model>
        </div>
      </div>
    </DashBoard>
  );
}

export default Expense;
