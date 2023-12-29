import { createStore } from "redux";

const obj = {
  jwtToken: "",
  haveToken: false,
  haveEmail: false,
  isLoading: false,
  email: "",
  defaultDeviceId:"",
  userDBinfo:{},
  userOAuthDetail:{},
  devicesInfo:[]
};
const reducerfn = (state = obj, action) => {
  if (action.type === "UPDATE_TOKEN") {
    return {
      ...state,
      haveToken: !state.haveToken,
      jwtToken: action.jwtToken,
    };
  }
  if (action.type === "UPDATE_DEFAULT_DEVICE") {
    return {
      ...state,
      defaultDeviceId:action.defaultDevice,
    };
  }
  if (action.type === "UPDATE_CURRENT_USER") {
    return {
      ...state,
      userOAuthDetail:action.userOAuthDetail,
    };
  }
  if (action.type === "UPDATE_USER_DB_INFO") {
    return {
      ...state,
      userDBinfo:action.userDBinfo,
    };
  }
  if (action.type === "UPDATE_USER_DEVICE_INFO") {
    return {
      ...state,
      devicesInfo:action.userDeviceInfo,
    };
  }
  if (action.type === "FORGET_TOKEN") {
    return {
      ...state,
      haveToken: !state.haveToken,
      jwtToken: "",
    };
  }
  if (action.type === "UPDATE_EMAIL") {
    return {
      ...state,
      haveEmail: true,
      email: action.email,
    };
  }
  if (action.type === "SWITCH_LOADING") {
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  }
  return state;
};
const store = createStore(reducerfn);

export default store;
