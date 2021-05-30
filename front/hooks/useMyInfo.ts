import useSWR from "swr";
import axios from "axios";

type ReturnTypes<T = any> = [T, () => void];
type AccessToken = {
  accessToken: string;
};
type RefershToken = {
  refreshToken: string;
};

const useMyInfo = (): ReturnTypes => {
  const fetcher = async (url: string) => {
    if (localStorage.getItem("accessToken")) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return response.data;
      } catch (e) {
        await axios
          .get("/refresh", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
          })
          .then((response) => {
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            console.log(localStorage.getItem("accessToken"));
          })
          .then(async () => {
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            });
            return response.data;
          });
      }
    }
    return null;
  };
  const { data: userData, error } = useSWR("/user", fetcher);
  return [userData, error];
};

export default useMyInfo;
