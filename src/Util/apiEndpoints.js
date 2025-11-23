export const BASE_URL = "https://moneymanagerapi-2.onrender.com/api/v1.0";
// export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dotiydeyr";
export const API_ENDPOINTS = {
  login: "/login",
  register: "/register",
  upload_image: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
  get_user_info: "/profileDTO",
  get_all_categories: "/categories",
  add_category: "/categories",
  update_category: "/categories",
  post_income: "incomes",
  post_expense: "expenses",
  get_current_month_incomes: "/incomes/current-month",
  get_current_month_expenses: "/expenses/current-month",
  delete_income: (id) => `/incomes/${id}`,
  delete_expense: (id) => `/expenses/${id}`,
  get_category_by_type: (type) => `/categories/${type}`,
  income_excel_download: "/excel/download/income",
  expense_excel_download: "/excel/download/expense",
  email_income: "/email/income-excel",
  email_expense: "/email/expense-excel",
  apply_filters: "/filter",
  dashboard_data: "/dashboard",
};
