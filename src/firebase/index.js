import app from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFjevpPodOxpN_iz2yh7rqF8Y9p6Gcy_c",
  authDomain: "clean-budget-7c013.firebaseapp.com",
  databaseURL: "https://clean-budget-7c013.firebaseio.com",
  projectId: "clean-budget-7c013",
  storageBucket: "clean-budget-7c013.appspot.com",
  messagingSenderId: "870909111856",
  appId: "1:870909111856:web:187e39243ff5eb6bee47f5",
  measurementId: "G-H4CMW2GJ3M"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    // Referenciando a database para acessar em outros locais
    this.app = app.database();
    this.storage = app.storage();
  }

  isInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    });
  }
}
export default new Firebase();
