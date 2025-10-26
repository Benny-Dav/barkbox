import { apiClient } from "./config"

export const apiSignup =  async(payload) =>{
    return await apiClient.post("/person/register",payload)
}

export const apiLogin = async(payload)=>{
    return await apiClient.post("/person/login",payload)
}

