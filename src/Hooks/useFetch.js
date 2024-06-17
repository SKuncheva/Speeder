import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tokenUser = JSON.parse(localStorage.getItem("token"));
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${tokenUser}`,
        },
      };
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, [url]);

  return { data };
};
