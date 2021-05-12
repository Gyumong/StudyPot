import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

type ReturnTypes<T = any> = [T, boolean, () => void];
const useMyInfo = (): ReturnTypes => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const fetcher = async (url: string) => {
    if (localStorage.getItem("accessToken")) {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setisLoggedIn(true);
      return response.data;
    }
    return null;
  };
  const { data, error } = useSWR("/user", fetcher);
  return [data, isLoggedIn, error];
};

export default useMyInfo;
