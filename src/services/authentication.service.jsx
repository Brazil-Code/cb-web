import Req from "../api";

class AuthenticationService {
    constructor() {
        this.CryptoJS = require('crypto-js');
    }

    login(username, password) {
        Req.post("login", {
            username: username,
            password: password
        }).then(response => {
        const user = response.json();
        const token = response.headers.get('Authorization');

        if (user && token) {
            const userCrypt = this.CryptoJS.AES.encrypt(JSON.stringify(user));
            const lToken = this.CryptoJS.AES.encrypt(user.id + user.firstName + user.lastName + user.email);
            sessionStorage.setItem('currentUser', userCrypt.toString());
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('ltoken', lToken);
        }

        return user;
        }).catch(error => {
            return error;
        });
    }
}

export default AuthenticationService;
