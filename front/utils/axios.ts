import axios from "axios";
import { backUrl } from "config/config";

// const axiosWithToken = axios.create({
//   baseURL: backUrl,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   },
// });

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
