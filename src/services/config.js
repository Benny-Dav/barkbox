import axios from "axios";

const token = localStorage.getItem("authToken");
console.log("token",token);

export const apiClient = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
    },
})