import axios from "axios";
import { ElMessage, dayjs } from "element-plus";

export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export const getDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;

  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  while (currentDate <= endDate) {
    dates.push({
      date: currentDate,
      month: currentDate.toLocaleString("default", { month: "long" }),
    });
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
});

$axios.interceptors.response.use(
  (response) => {
    if (response.data.meta.message) {
      ElMessage({
        message: response.data.meta.message,
        type: "success",
      });
    }
    return response.data;
  },
  (error) => {
    let data = error.response.data.meta;
    ElMessage({
      message: data.message,
      type: "error",
    });

    if (error.response.status == 401) {
      clearToken();
      router.push("/login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const $http = $axios;

export const renderCapacity = (data, filter, user_id) => {
  let rawData = JSON.parse(JSON.stringify(data));

  let filterDate = dayjs(filter.date).format("YYYY-MM-DD");
  let user_load = rawData.filter(
    (item) => item.date == filterDate && item.user_id == user_id
  );

  if (!user_load.length) var totalHour = 0;
  else {
    var totalHour = user_load
      .map((item) => item.assigned_hour)
      .reduce((prev, next) => prev + next);
  }

  if (totalHour > 8) var capacityStatus = "bg-red-400";
  else if (totalHour == 0) var capacityStatus = "bg-gray-400";
  else var capacityStatus = "bg-green-400";

  let capacity = encodeURIComponent(JSON.stringify(user_load));

  return `<div class="capacity ${capacityStatus}" data-capacity="${capacity}">${totalHour}</div>`;
};
