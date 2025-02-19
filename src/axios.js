import axios from "axios";

const instance = axios.create({
    baseURL: ""// Insert the API URL here, retrieved by running firebase emulators:start
});

export default instance