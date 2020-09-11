import React from "react";
import { useQuery, gql } from "@apollo/react-hooks";
import Container from "../layout/Container";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { AcolytePastoralVisits } from "../../generated/AcolytePastoralVisits";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./LoggedApp";

const ACOLYTE_PASTORAL_VISTIS = gql`
  query AcolytePastoralVisits {
    pastoralVisits {
      id
      hour
    }
  }
`;

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: MainScreenNavigationProp;
};

const Main: React.FC<Props> = ({ navigation }) => {
  const { loading, error, data } = useQuery<AcolytePastoralVisits>(
    ACOLYTE_PASTORAL_VISTIS
  );

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.pastoralVisits) return <div>error</div>;

  return (
    <Container>
      <FlatList
        data={data.pastoralVisits}
        renderItem={({ item: { id, hour } }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Visit", { visitId: id })}
          >
            <Text>{id}</Text>
            <Text>{hour}</Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default Main;
