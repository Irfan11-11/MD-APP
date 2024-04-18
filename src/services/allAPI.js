import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"

//register
export const registerAPI = async (reqBody)=>{
   return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}


//get all details
export const getAllDetalsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-details`,"",reqHeader)
}
