import { useEffect, useState } from "react";

const useLocalStorage = (defaultValue, tokenKey) => {
  const [value, setValue] = useState(() => {
    const getToken = JSON.parse(localStorage.getItem(tokenKey));
    return getToken !== null ? getToken : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }, [value, tokenKey]);

  return [value, setValue];
};

export default useLocalStorage;
