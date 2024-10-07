import axios from "axios";
const instance = axios.create({
    baseURL: 'https://portal-dev.lemp.vn',
});

export default instance 
