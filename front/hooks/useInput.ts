import { useState, useCallback, ChangeEvent, Dispatch, SetStateAction } from "react";

type ReturnTypes<T = any> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initalValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initalValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
