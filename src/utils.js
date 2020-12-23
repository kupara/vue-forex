import axios from "axios";

import BASE_URL from "./constants";

export const getDatesForInterval = interval => {
  const today = new Date();
  const beginDate = new Date(today.setMonth(today.getMonth() - interval));

  // format to YYYY-MM-DD
  const [startDate] = beginDate.toISOString().split("T");
  const [endDate] = new Date().toISOString().split("T");
  return {
    startDate,
    endDate
  };
};

export const fetchHistoricalData = async (base, target) => {
  const { startDate, endDate } = getDatesForInterval(1);
  const { data } = await axios.get(
    `${BASE_URL}/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${target}`
  );
  return data;
};
