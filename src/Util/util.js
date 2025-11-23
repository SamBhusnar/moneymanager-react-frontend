import { API_ENDPOINTS } from "./apiEndpoints";
import axiosConfig from "./axiosConfig";

export const addThousandSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  // convert number to string to handle decimal
  const numStr = num.toString();
  // split number into parts
  const parts = numStr.split(".");
  // add comma to first part
  let integerPart = parts[0];
  let fractionPart = parts[1];
  // Regex for Indian numaric system
  // It handles the first three digits , then every two digits
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherDigits = integerPart.substring(0, integerPart.length - 3);
  if (otherDigits !== "") {
    // apply comma after every two digits for the 'otherDigits' part
    const formattedOtherNumbers = otherDigits.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = `${formattedOtherNumbers},${lastThree}`;
  } else {
    integerPart = lastThree; //  No change if than 4 digits
  }
  return fractionPart ? `${integerPart}.${fractionPart}` : integerPart;
};

export const prepareIncomeLineChartData = async () => {
  // 1. FETCH ALL DATA
  const response = await axiosConfig.get(
    API_ENDPOINTS.get_current_month_incomes
  );

  if (!(response.status === 200 || response.status === 201)) return [];

  console.log("Raw income data:", response.data);

  // Function to convert date → "6th Jul"
  const formatDateToMonthName = (fullDateString) => {
    const dateObj = new Date(fullDateString);
    const day = dateObj.getDate();

    const suffix =
      day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day}${suffix} ${monthNames[dateObj.getMonth()]}`;
  };

  // 2. GROUP BY DATE
  const groupedData = response.data.reduce((acc, item) => {
    const dateOnly = item.date.split("T")[0];

    if (!acc[dateOnly]) {
      acc[dateOnly] = {
        date: dateOnly,
        totalAmount: 0,
        items: [],
        month: formatDateToMonthName(item.date),
      };
    }

    acc[dateOnly].totalAmount += item.amount;
    acc[dateOnly].items.push(item);

    return acc;
  }, {});

  // 3. CONVERT OBJECT → SORTED ARRAY
  const finalArray = Object.values(groupedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  console.log("Final chart-ready data:", finalArray);

  return finalArray;
};

export const prepareExpenseLineChartData = async () => {
  // 1. FETCH ALL DATA
  const response = await axiosConfig.get(
    API_ENDPOINTS.get_current_month_expenses
  );

  if (!(response.status === 200 || response.status === 201)) return [];

  console.log("Raw income data:", response.data);

  // Function to convert date → "6th Jul"
  const formatDateToMonthName = (fullDateString) => {
    const dateObj = new Date(fullDateString);
    const day = dateObj.getDate();

    const suffix =
      day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day}${suffix} ${monthNames[dateObj.getMonth()]}`;
  };

  // 2. GROUP BY DATE
  const groupedData = response.data.reduce((acc, item) => {
    const dateOnly = item.date.split("T")[0];

    if (!acc[dateOnly]) {
      acc[dateOnly] = {
        date: dateOnly,
        totalAmount: 0,
        items: [],
        month: formatDateToMonthName(item.date),
      };
    }

    acc[dateOnly].totalAmount += item.amount;
    acc[dateOnly].items.push(item);

    return acc;
  }, {});

  // 3. CONVERT OBJECT → SORTED ARRAY
  const finalArray = Object.values(groupedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  console.log("Final chart-ready data:", finalArray);

  return finalArray;
};
