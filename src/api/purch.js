import axios from "axios";
import config_qa from "./config_qa.json";

export default axios.create({
  baseURL: config_qa.PURCH_URL,
  responseType: "application/json"
});
