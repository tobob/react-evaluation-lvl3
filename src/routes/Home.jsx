import React from "react";
import Header from "../components/Header";
import useHowLong from "../hooks/useHowLong";

const Home = () => {
  const info = useHowLong();

  return (
    <div>
      <Header underline>Home</Header>
      <strong>{info}</strong>
    </div>
  );
};

export default Home;
