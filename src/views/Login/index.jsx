import React, { Component } from "react";
import req from "../../api/index";
import "./Login.css";
import NotificationAlert from "react-notification-alert";
import firebase from "../../firebase/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Loading: false,
      Image: ""
    };
    this.getUserFoto = this.getUserFoto.bind(this);
    this.login = this.login.bind(this);
    this.notify = this.notify.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidMount(props) {
    if (sessionStorage.getItem("ltoken") !== null) {
      this.props.history.replace("/admin/dashboard");
    }
  }

  getUserFoto() {
    this.handleImage(this.state.username);
  }

  handleImage = async username => {
    await firebase.storage
      .ref("image")
      .child("user")
      .child(username)
      .child("perfil.jpg")
      .getDownloadURL()
      .then(url => {
        this.setState({ Image: url });
      })
      .catch(error => {
        if (this.state.username === "") {
          this.setState({ Image: "" });
        }
      });
  };

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
        sessionStorage.setItem("firstName", data.data.firstName);
        sessionStorage.setItem("lastName", data.data.lastName);
        sessionStorage.setItem("email", data.data.email);
        sessionStorage.setItem("imageProfile", this.state.Image);
        sessionStorage.setItem("userName", this.state.username);
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
      icon: "tim-icons icon-alert-circle-exc",
      autoDismiss: 3
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div id="LoginStyle">
          <div className="left">
            {this.state.Image !== "" ? (
              <img
                className="ImgameLogo"
                src={this.state.Image}
                alt="img"
              ></img>
            ) : (
              <h1>Brazil Code</h1>
            )}
          </div>
          <div className="right">
            <div className="box-title">
              <span id="title">Clean Budget</span>
              {this.state.Loading === true ? (
                <div className="loader"></div>
              ) : (
                <></>
              )}
            </div>
            <div className="react-notification-alert-container">
              <NotificationAlert ref="notificationAlert" />
            </div>

            <form onSubmit={this.login} id="form">
              <label htmlFor="userName">Usuário</label>
              <input
                type="text"
                id="userName"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <label htmlFor="current-password">Senha</label>
              <input
                type="password"
                autoComplete="true"
                onFocus={this.getUserFoto}
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
