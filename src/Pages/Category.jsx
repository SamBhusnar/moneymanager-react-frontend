import React, { useEffect, useState } from "react";
import DashBoard from "../Components/DashBoard";
import { useUser } from "../Hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../Components/CategoryList";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import Model from "../Components/Model";
import CategoryForm from "../Components/AddCategoryForm";

function Category() {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.get_all_categories);
      console.log(response);

      if (response.status === 200) {
        console.log("category data ", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("something went wrong", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAddCategory = async (category) => {
    // setOpenAddCategoryModel(true);

    console.log(category);
    const { name, type, icon, id } = category;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!type.trim()) {
      console.log(type);

      toast.error("Category type is required");
      return;
    }
    if (!icon.trim()) {
      toast.error("Category icon is required");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosConfig.post(API_ENDPOINTS.add_category, {
        name,
        type,
        icon,
      });
      console.log(response.status);

      if (response.status === 200 || response.status === 201) {
        console.log("category added successfully");
        // toast.success("Category added successfully");
        setOpenAddCategoryModel(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("error while adding category", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    toast.success("Category added successfully");
  };
  useEffect(() => {
    fetchCategoryDetails();
  }, []);
  // unused function
  const handleEditCategory = async (categoryEdit) => {
    const { name, type, icon, id } = categoryEdit;
    if (!name.trim() || !type.trim() || !icon.trim()) {
      toast.error("All parameter are required !");
      return;
    }

    console.log("Editing the category...", categoryEdit);
    try {
      setLoading(true);
      const response = await axiosConfig.put(
        `${API_ENDPOINTS.update_category}/${categoryEdit.id}`,
        categoryEdit
      );
      console.log("this is response on edit : ", response);

      if (response.status === 200) {
        toast.success("Category updated successfully");
        setOpenEditCategoryModel(false);
        fetchCategoryDetails();
      }
      console.log(response);
    } catch (error) {
      console.error("error while updating category", error);
      toast.error(error?.response?.data?.message||"something went wrong while updating category");
      fetchCategoryDetails();
    }finally {
      setLoading(false);
    }
  };
  const handleupdateCategory = async (categoryEdit) => {
    console.log("Updating the category...", categoryEdit);
    setSelectedCategory(categoryEdit);
    setOpenEditCategoryModel(true);
  };

  return (
    <DashBoard activeMenu={"Category"}>
      <div className=" my-5 mx-3 ">
        {/* add button to add category  */}
        <div className="flex justify-between items-center  mb-5">
          <h2 className="text-2xl font-semibold  ">All Categories</h2>
          <button
            className="text-green-500 bg-green-100  rounded-md py-2 px-3 flex items-center gap-1 cursor-pointer "
            onClick={() => setOpenAddCategoryModel(true)}
          >
            <Plus size={15} />
            {loading ? <>"Add Category"</> : "Add Category"}
          </button>
        </div>
        {/* category list  */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleupdateCategory}
        />
        {/* adding category model */}
        <Model
          title={"Add Category"}
          isOpen={openAddCategoryModel}
          onClose={() => setOpenAddCategoryModel(false)}
        >
          <CategoryForm
            onAddCategory={handleAddCategory}
            loading={loading}
            setLoading={setLoading}
          />
        </Model>
        {/* updating category model */}
        <Model
          title={"Edit Category"}
          isOpen={openEditCategoryModel}
          onClose={() => {
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
          }}
        >
          <CategoryForm
            onAddCategory={handleEditCategory}
            loading={loading}
            setLoading={setLoading}
            isEditing={true}
            initialCategoryData={selectedCategory}
          />
        </Model>
      </div>
    </DashBoard>
  );
}

export default Category;
