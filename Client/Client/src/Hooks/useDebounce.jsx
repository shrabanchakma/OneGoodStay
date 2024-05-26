import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [data, setData] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setData(value);
      console.log("checking debounce");
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return data;
};
