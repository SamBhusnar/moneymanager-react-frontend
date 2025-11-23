import React, { useState } from "react";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

function AddForm({
  categories,
  onAddIncome,
  loading,
  type,
  onAddExpense,
}) {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: categories[0]?.id ? categories[0]?.id : null,
  });
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: categories[0]?.id ? categories[0]?.id : null,
  });
  
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const handleChange = (key, value) => {
    if (type === "Income") {
      setIncome((prevIncome) => ({
        ...prevIncome,
        [key]: value,
      }));
      console.log(income);
    } else {
      setExpense((prevExpense) => ({
        ...prevExpense,
        [key]: value,
      }));
      console.log(expense);
    }
  };
  return (
    <div className="">
      <EmojiPickerPopUp
        icon={type === "Income" ? income.icon : expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={type === "Income" ? income.name : expense.name}
        onChange={(e) => handleChange("name", e)}
        label={`${type === "Income" ? "Income" : "Expense"} Source`}
        placeholder={"e.g. salary,freelance,bonus"}
        type={"text"}
      /> 
      <Input
        value={type === "Income" ? income.categoryId : expense.categoryId}
        onChange={(e) => handleChange("categoryId", e)}
        label={"Category"}
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        value={type === "Income" ? income.amount : expense.amount}
        onChange={(e) => handleChange("amount", e)}
        label={"Amount"}
        placeholder={"e.g. 500,1000"}
        type={"number"}
      />
      <Input
        value={type === "Income" ? income.date : expense.date}
        onChange={(e) => handleChange("date", e)}
        label={"Date"}
        placeholder={""}
        type={"date"}
      />
      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            type === "Income" ? onAddIncome(income) : onAddExpense(expense);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 "
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="flex items-center justify-between gap-2 w-full">
                <LoaderCircle className="animate-spin   " />
                {loading
                  ? "adding..."
                  : type === "Income"
                  ? "Add Income"
                  : "Add Expense"}
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center justify-between gap-2 w-full">
                Add {type === "Income" ? "Income" : "Expense"}
              </span>
            </>
          )}
        </button>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
}

export default AddForm;
