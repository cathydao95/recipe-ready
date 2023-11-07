import axios from "axios";

// set up default config for axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default axios;
