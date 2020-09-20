import React from "react";
import { useQuery, gql } from "@apollo/react-hooks";
import Container from "../layout/Container";

import { Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./LoggedApp";
import {
  AcolyteActiveDaysVariables,
  AcolyteActiveDays,
} from "../../generated/AcolyteActiveDays";
import { useAuthContext, useSeasonContext } from "@koleda/common";
import { Card, List, Paragraph, Surface, Title } from "react-native-paper";

const ACOLYTE_ACTIVE_DAYS = gql`
  query AcolyteActiveDays($daysInput: DaysInput!, $user: String!) {
    days(input: $daysInput) {
      id
      visitDate
      reeceDate
      pastoralVisits(input: { acolyte: $user }) {
        priest {
          id
          username
        }
        acolytes {
          id
          username
        }
        id
        hour
      }
    }
  }
`;

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const todaysDate = new Date().toISOString();
const futureDate = new Date(new Date().getTime() + 900000000000).toISOString();
type Props = {
  navigation: MainScreenNavigationProp;
};

const Main: React.FC<Props> = ({ navigation }) => {
  const { me } = useAuthContext();
  const { currentSeason } = useSeasonContext();

  const { loading, error, data } = useQuery<
    AcolyteActiveDays,
    AcolyteActiveDaysVariables
  >(ACOLYTE_ACTIVE_DAYS, {
    variables: {
      daysInput: {
        from: todaysDate,
        to: futureDate,
        season: currentSeason.id,
      },
      user: me!.id,
    },
  });

  if (loading) return <Text>loading..</Text>;
  if (error || !data || !data.days) return <Text>error</Text>;

  const days = data.days.filter(
    ({ pastoralVisits }) => pastoralVisits.length > 0
  );

  return (
    <Container>
      <FlatList
        data={days}
        renderItem={({ item: { id, pastoralVisits, visitDate } }) => (
          <Card key={id}>
            <Card.Content>
              <Title>{new Date(visitDate).toLocaleDateString()}</Title>
              {pastoralVisits.map(({ id, hour, acolytes }) => (
                <TouchableOpacity key={id}>
                  <List.Item
                    description={hour}
                    title={acolytes.map(({ username }) => username).join(", ")}
                    onPress={() =>
                      navigation.navigate("Visit", { visitId: id })
                    }
                  />
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>
        )}
      />
    </Container>
  );
};

export default Main;
