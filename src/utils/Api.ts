import axios from "axios";

const ENV = import.meta.env
export const API = axios.create({
    baseURL: ENV.VITE_API_URL,
});