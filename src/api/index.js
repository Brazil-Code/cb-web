import axios from "axios";

export default axios.create({
  baseURL: "https://cb-authentication-service.herokuapp.com",
  responseType: "json"
});
