import React, { Component } from "react";
import req from "../../api/index";
import { UncontrolledAlert, Button } from "reactstrap";
import logo from "../../assets/img/logo.png";
import "./Login.css";
import NotificationAlert from "react-notification-alert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Loading: false
    };

    this.login = this.login.bind(this);
    this.notify = this.notify.bind(this);
  }

  login = async e => {
    this.setState({ Loading: true });
    e.preventDefault();

    await req
      .post("/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(data => {
        this.setState({ error: false });
        sessionStorage.setItem("ltoken", data.data.token);
        this.props.history.replace("/admin/dashboard");
      })
      .catch(error => {
        this.setState({ error: true });
        this.notify("tr");
        this.setState({ Loading: false });
      });
  };

  notify = place => {
    var type = "danger";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>Verifique o usuario e senha e tente novamente</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 3
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div id="LoginStyle">
          <div className="left">
            <img src={logo}></img>
          </div>
          <div className="right">
            <div className="box-title">
              <span id="title">Clean Budget</span>
              {this.state.Loading === true ? <div class="loader"></div> : <></>}
            </div>
            <div className="react-notification-alert-container">
              <NotificationAlert ref="notificationAlert" />
            </div>
            <form onSubmit={this.login} id="form">
              <label for="userName">Usuário</label>
              <input
                type="text"
                id="userName"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <label for="current-password">Senha</label>
              <input
                type="password"
                id="current-password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <button type="submit">Entrar</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
