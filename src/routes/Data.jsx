import React from "react";
import useHowLong from "../hooks/useHowLong";
import { useQuery, gql } from "@apollo/client";
import Header from "../components/Header";

const HelloQuery = gql`
  query Hello {
    message
  }
`;

const Data = () => {
  const { data } = useQuery(HelloQuery);
  const info = useHowLong();

  return (
    <div>
      <Header underline>Data</Header>
      <i>data: {JSON.stringify(data)}</i>
      <strong>{info}</strong>
    </div>
  );
};

export default Data;
