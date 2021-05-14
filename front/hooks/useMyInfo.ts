import useSWR from "swr";
import axios from "axios";

type ReturnTypes<T = any> = [T, () => void, boolean];
type AccessToken = {
  accessToken: string;
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
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        });
        localStorage.setItem("accessToken", accessToken);
      }
    }
    return null;
  };
  const { data: userData, error, isValidating: loading } = useSWR("/user", fetcher);
  return [userData, error, loading];
};

export default useMyInfo;
