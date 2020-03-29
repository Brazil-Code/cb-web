import React, { Component } from "react";
import req from "../../api/index";
import logo from "../../assets/img/logo.png";
import "./Login.css";
import NotificationAlert from "react-notification-alert";
import firebase from "../../firebase/";
import UserService from "../../services/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Loading: false,
      Image: ""
    };
    this.getUserPic = this.getUserPic.bind(this);
    this.login = this.login.bind(this);
    this.notify = this.notify.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidMount(props) {
    if (sessionStorage.getItem("ltoken") !== null) {
      this.props.history.replace("/admin/dashboard");
    }
  }

  getUserPic() {
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
      .catch(_error => {
        if (_error) {
          this.setState({ Image: "" });
        }
      });
  };

  login = async e => {
    this.setState({ Loading: true });
    e.preventDefault();

    await UserService.login(this.state.username, this.state.password)
      .then(data => {
        UserService.setUser(data);
        window.location.href = "/admin/dashboard";
      })
      .catch(_error => {
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
          <div>Usuário / Senha inválidos</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-alert-circle-exc",
      autoDismiss: 5
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
                className="userImg"
                src={this.state.Image}
                alt="user image"
              ></img>
            ) : (
              <img
                className="logo"
                src={logo}
                alt="logo"
              ></img>
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
                onFocus={this.getUserPic}
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
