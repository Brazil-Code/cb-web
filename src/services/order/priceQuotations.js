import axios from "../../api";
import userService from "../login/index";

class Quotation {
  async addQuotations(data) {
    return await axios.post(
      "https://cb-purchase-service.herokuapp.com/purchase-request",
      data,
      this.tokenPayload()
    );
  }

  tokenPayload() {
    let config = {
      headers: {
        Authorization: userService.getToken()
      }
    };
    return config;
  }
}

export default new Quotation();
