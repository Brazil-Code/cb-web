import React,{Component} from 'react'
import './style.css';
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }

        this.Logar = this.Logar.bind(this)
    }
    Logar(e){
        e.preventDefault()
        window.location.href = "/admin/dashboard";
    }

    render(){
        return(
            <>
                <div id="back">
                <canvas id="canvas" class="canvas-back"></canvas>
                <div class="backRight">    
                </div>
                <div class="backLeft">
                     {/*Imagem aqui*/}
                </div>
                </div>

                <div id="slideBox">
                <div class="topLayer">
                    <div class="right">
                    <div class="content">
                        <h2>Clean Budget</h2>
                        <form id="form-login">
                        <div class="form-element form-stack">
                            <label for="username-login" class="form-label">Usuario</label>
                            <input id="username-login" type="text" name="username"/>
                        </div>
                        <div class="form-element form-stack">
                            <label for="password-login" class="form-label">Senha</label>
                            <input id="password-login" type="password" name="password"/>
                        </div>
                        <div class="form-element form-submit">
                            <button id="logIn" class="login" onClick={this.Logar} name="login">Entrar</button>
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