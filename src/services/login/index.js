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

  logOut() {
    sessionStorage.removeItem("ltoken");
    sessionStorage.removeItem("user");
  }

  getToken() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    return data.token;
  }
  getFirstName() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    return data.firstName;
  }
  getLastName() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    return data.lastName;
  }
  getEmail() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    return data.email;
  }
  getId() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    return data.id;
  }
  getUserName() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    return data.username;
  }
}

export default new Login();
