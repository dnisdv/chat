import axios from "axios";
axios.defaults.baseURL = "http://192.168.100.3:3003"
axios.defaults.headers.common["token"] = window.localStorage.token;

window.axios = axios;

export default axios;
