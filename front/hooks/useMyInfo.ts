import useSWR from "swr";
import axios from "axios";

type ReturnTypes<T = any> = [T, () => void, boolean];
const useMyInfo = (): ReturnTypes => {
  const fetcher = async (url: string) => {
    if (localStorage.getItem("accessToken")) {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    }
    return null;
  };
  const { data: userData, error, isValidating: loading } = useSWR("/user", fetcher);
  return [userData, error, loading];
};

export default useMyInfo;
