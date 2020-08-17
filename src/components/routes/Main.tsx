import React from "react";
import { Surface } from "react-native-paper";
import { Text } from "react-native";
import { useQuery, gql } from "@apollo/react-hooks";

const ACOLYTE_PASTORAL_VISTIS = gql`
  query AcolytePastoralVisits($input: String!) {
    pastoralVisits
  }
`;

const Main: React.FC = () => {
  const { loading, error, data } = useQuery<I>();

  if (loading || !data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return <></>;
};

export default Main;
