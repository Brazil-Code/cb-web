import axios from "../../../api";
import userService from "../../login/index";
import url from "../../../api/config_qa.json";

class PurchaseRequestService {
  async createPurchaseRequest(data) {
    return await axios.post(
      url.PURCH_URL + "/purchase-request",
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

export default new PurchaseRequestService();
