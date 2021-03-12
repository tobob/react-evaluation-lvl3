import { useEffect, useState, useRef } from "react";

const useHowLong = () => {
  const [howLong, setHowLong] = useState(0);
  const timeourRef = useRef();

  const addTime = () => setHowLong((prev) => prev + 1);

  useEffect(() => {
    timeourRef.current = setInterval(addTime, 1000);
    return () => clearInterval(timeourRef.current);
  }, []);

  return `You are here: ${howLong} seconds!`;
};

export default useHowLong;
