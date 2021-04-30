import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@lib/slices";
import { loginRequest } from "@lib/slices/users";

export default function useUser() {
  const { userLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const login = useCallback((data: { email: string; password: string }) => {
    dispatch(loginRequest(data));
  }, []);
  return { userLoading, login };
}
