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
        const { accessToken }: AccessToken = await axios.get("/refresh", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        });
        localStorage.setItem("accessToken", accessToken);
      }
    }
    return null;
  };
  const { data: userData, error } = useSWR("/user", fetcher);
  return [userData, error];
};

export default useMyInfo;
