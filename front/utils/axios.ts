import { IToken } from "@typings/db";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { backUrl } from "config/config";
import * as jwt from "jsonwebtoken";

export const axiosWithToken: AxiosInstance = axios.create({
  baseURL: backUrl,
  headers: {
    Authorization: `Bearer ${typeof Storage !== "undefined" && localStorage.getItem("accessToken")}`,
  },
});

export const checkToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const accessToken = localStorage.getItem("accessToken") as string;
  const refreshToken = localStorage.getItem("refreshToken") as string;
  if (accessToken) {
    const decode = jwt.decode(accessToken) as IToken;
    const nowDate = new Date().getTime() / 1000;
    if (decode.expiredAt < nowDate) {
      const { data } = await axios.get(`${backUrl}/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      console.log("refresh 됌");
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;
      await localStorage.setItem("accessToken", newAccessToken);
      await localStorage.setItem("refreshToken", newRefreshToken);
    }
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  }

  return config;
};

axiosWithToken.interceptors.request.use(checkToken);
// export const checkToken = async (config:AxiosRequestConfig) =>{
//     let accessToken
// }

// axiosWithToken.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     const originalRequest = config;
//     if (status === 401) {
//       const refreshToken = localStorage.getItem("refreshToken");
//       axios({
//         method: "get",
//         url: `${backUrl}/refresh`,
//         data: { refreshToken },
//       }).then((response) => {
//         const accessToken = response.data.accessToken;
//         localStorage.setItem("accessToken", accessToken);

//         originalRequest.headers = { Authorization: `Bearer ${localStorage.getItem("accessToken")}` };
//         return axios(originalRequest);
//       });
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosWithToken;
