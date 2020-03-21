import axios from "../../api/index";

class Login {
  async logar(username, password) {
    return await axios.post("/login", { username, password });
  }

  async setUser(...data) {
    let user = await { ...data };
    sessionStorage.setItem("user", JSON.stringify(user[0].data));
    sessionStorage.setItem("ltoken", user[0].data.token);
  }

  Logout() {
    sessionStorage.removeItem("ltoken");
    sessionStorage.removeItem("user");
  }
}

export default new Login();
