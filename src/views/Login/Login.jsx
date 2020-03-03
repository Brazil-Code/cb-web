import React, { Component } from "react";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.AuthenticationService = require('../../services/authentication.service');
    this.login = this.login.bind(this);
  }

  login = async e => {
    e.preventDefault();

    this.AuthenticationService.login(this.state.username, this.state.password).then(response => {
      //this.props.history.location('/admin/dashboard');
    });
  };

  render() {
    return (
      <>
        <div id="back">
          <canvas id="canvas" className="canvas-back"></canvas>
          <div className="backRight"></div>
          <div className="backLeft"></div>
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
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value })
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
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
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
