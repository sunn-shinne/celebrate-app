import axios from "axios";

export const holidayClient = axios.create({
  baseURL: "https://date.nager.at",
});
