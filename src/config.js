import axios from "axios";
import constant from "./constant";
const {baseUrl, Authkey, washrzserver} = constant;

export const instance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Authkey}`,
  },
});

export const pickupinstance = axios.create({
  baseURL: `${washrzserver}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios.create({
  baseURL: `/api/v1${washrzserver}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: `/api/v1${washrzserver}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
