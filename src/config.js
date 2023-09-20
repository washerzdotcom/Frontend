import axios from "axios";
import constant from "./constant";

export const instance = axios.create({
    baseURL: `${constant.baseUrl}/api/v1` ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${constant.Authkey}`,
      }
  });

  export const pickupinstance = axios.create({
    baseURL: `${constant.washrzserver}/api/v1` ,
      headers: {
        'Content-Type': 'application/json',
      }
  });

