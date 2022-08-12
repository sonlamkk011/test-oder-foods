import axios from "axios";
import { AUTH_TOKEN, BASE_URL_SERVER } from "../server";


export const currentUserId = localStorage.getItem("current_user_id");

const API_ENDPOINT = {
  ACCESS_AUTH_TOKEN: "/token",
  GET_AUTH_USER: "api/v1/accounts/login",
  REGISTER_ACCOUNT: "api/v1/accounts/register",

};
const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
}

class AuthService {
  accessAuthToken = async (data) => {
    return await axios.post(
      BASE_URL_SERVER + API_ENDPOINT,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };


  getAuthUser = async (accessToken) => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_AUTH_USER, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  registerAccount = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.REGISTER_ACCOUNT, data);
  }



}

const authService = new AuthService();
export default authService;
