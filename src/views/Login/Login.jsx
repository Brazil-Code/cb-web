import React, { Component } from "react";
import Req from "../../api";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sUsername: "",
      sPassword: ""
    };

    this.login = this.login.bind(this);
  }

  login = async e => {
    e.preventDefault();

    await Req.post("login", {
      username: this.state.sUsername,
      password: this.state.sPassword
    })
      .then(res => {
        alert(res.data);
        //caso o usuario e senha esteja correta
        //key sera armazanada no localstorage
      })
      .catch(error => {
        console.log(error);
      });

    return;
  };

  render() {
    return (
      <>
        <div id="back">
          <canvas id="canvas" className="canvas-back"></canvas>
          <div className="backRight"></div>
          <div className="backLeft">{/*Imagem aqui*/}</div>
        </div>
        <div id="slideBox">
          <div className="topLayer">
            <div className="right">
              <div className="content">
                <h2>Clean Budget</h2>
                <form id="form-login" onSubmit={this.login}>
                  <div className="form-element form-stack">
                    <label for="username-login" className="form-label">
                      Usuario
                    </label>
                    <input
                      id="username-login"
                      type="text"
                      name="username"
                      value={this.state.sUsername}
                      onChange={e =>
                        this.setState({ sUsername: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-element form-stack">
                    <label for="password-login" className="form-label">
                      Senha
                    </label>
                    <input
                      id="password-login"
                      type="password"
                      name="password"
                      value={this.state.sPassword}
                      onChange={e =>
                        this.setState({ sPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-element form-submit">
                    <button
                      id="logIn"
                      className="login"
                      type="submit"
                      name="login">
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
