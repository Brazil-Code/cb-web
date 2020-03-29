import axios from "../../api/index";

class Login {
  async login(username, password) {
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

  data = JSON.parse(sessionStorage.getItem("user"));

  getToken() {
    return this.data.token;
  }

  getFirstName() {
    return this.data.firstName;
  }

  getLastName() {
    return this.data.lastName;
  }

  getArea() {
    return this.data.area.name;
  }

  getEmail() {
    return this.data.email;
  }

  getId() {
    return this.data.id;
  }

  getUserName() {
    return this.data.username;
  }

  getFullName() {
    return this.data.firstName + " " + this.data.lastName;
  }
}

export default new Login();
