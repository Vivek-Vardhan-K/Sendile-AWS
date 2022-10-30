import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/index";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId="923329143869-cujg980kd9pkjf1956mdip46434cetcj.apps.googleusercontent.com"

ReactDOM.render(
  
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}><App /></GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
