import useSWR from "swr";
import axios from "axios";
const useMyInfo = () => {
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
  const { data, error } = useSWR("/user", fetcher);
  if (error) return console.log(error);
  return [data];
};

export default useMyInfo;
