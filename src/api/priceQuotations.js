import req from "./index";

class Quotation {
  async addQuotations(data) {
    await req
      .post("purchase-request", data)
      .then(suc => console.log(suc))
      .catch(err => console.log(err));
  }
}

export default new Quotation();
