import React, { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import { LoaderCircle } from "lucide-react";
function AddCategoryForm({
  onAddCategory,
  loading,
  setLoading,
  isEditing,
  initialCategoryData,
}) {
  const [category, setCategory] = useState({
    name: "",
    type: "Expense",
    icon: "",
  });
  const categoryTypeOptions = [
    { value: "Expense", label: "Expense" },
    { value: "Income", label: "Income" },
  ];
  const handleChange = (key, value) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      [key]: value,
    }));
    console.log(category);
  };
  const handleSubmit = () => {
    onAddCategory(category);
  };
  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({
        name: "",
        type: "Expense",
        icon: "",
      });
    }
  }, [isEditing, initialCategoryData]);

  return (
    <div className="p-4 ">
      <EmojiPickerPopUp
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        type="text"
        placeholder="e.g. Freelance , Salary , Groceries"
        value={category.name}
        onChange={(e) => handleChange("name", e)}
        label={"Category Name"}
      />
      <Input
        type="text"
        placeholder="e.g. Freelance , Salary , Groceries"
        value={category.type}
        onChange={(e) => handleChange("type", e)}
        label={"Category type"}
        isSelect={true}
        options={categoryTypeOptions}
      />
      <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
          onClick={handleSubmit}
          type="button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="flex items-center justify-between gap-2 w-full">
                <LoaderCircle className="animate-spin   " />
                {isEditing ? "Updating..." : "Adding..."}
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center justify-between gap-2 w-full">
                {isEditing ? "Update" : "Add Category"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AddCategoryForm;
