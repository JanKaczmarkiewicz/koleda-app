import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

import { RootStackParamList } from "./LoggedApp";

import { RouteProp } from "@react-navigation/native";

import { Title, Caption } from "react-native-paper";
import Container from "../layout/Container";
import UpdateEntranceModal from "../modals/UpdateEntranceModal";

import { client, splitByLabel } from "@koleda/common";

import {
  AcolytePastoralVisit_pastoralVisit_entrances,
  AcolytePastoralVisit,
  AcolytePastoralVisitVariables,
} from "../../generated/AcolytePastoralVisit";

import { FlatList } from "react-native";
import StreetEntrancesGroup from "./StreetEntrancesGroup";

type VisitScreenRouteProp = RouteProp<RootStackParamList, "Visit">;

type Props = {
  route: VisitScreenRouteProp;
};

export type Entrance = AcolytePastoralVisit_pastoralVisit_entrances;

const VISIT = gql`
  query AcolytePastoralVisit($input: FindOneInput!) {
    pastoralVisit(input: $input) {
      id
      hour
      priest {
        id
        username
      }
      acolytes {
        id
        username
      }
      entrances {
        id
        comment
        house {
          id
          street {
            id
            name
          }
          number
        }
        reeceState
        visitState
      }
    }
  }
`;

const Visit: React.FC<Props> = ({ route }) => {
  const { visitId } = route.params;

  const [editedEntrance, setEditedEntrance] = useState<Entrance | null>(null);

  const queryOptions = { query: VISIT, variables: { input: { id: visitId } } };

  const { loading, error, data } = useQuery<
    AcolytePastoralVisit,
    AcolytePastoralVisitVariables
  >(queryOptions.query, {
    variables: queryOptions.variables,
  });

  const handleUpdateEntrance = (updatedEntrance: Entrance) => {
    const query = client.readQuery<
      AcolytePastoralVisit,
      AcolytePastoralVisitVariables
    >(queryOptions);

    if (!query || !query.pastoralVisit) return;

    const updatedEntrances = [
      ...query.pastoralVisit.entrances,
    ].map((entrance) =>
      updatedEntrance.id === entrance.id ? updatedEntrance : entrance
    );

    client.writeQuery<AcolytePastoralVisit, AcolytePastoralVisitVariables>({
      ...queryOptions,
      data: {
        pastoralVisit: { ...query.pastoralVisit, entrances: updatedEntrances },
      },
    });
  };

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.pastoralVisit) return <div>error</div>;

  const showModal = (entrance: Entrance) => setEditedEntrance(entrance);

  const hideModal = () => setEditedEntrance(null);

  const { entrances, priest, acolytes } = data.pastoralVisit;

  const splitedEntrances = splitByLabel(
    entrances,
    ({ house }) => house?.street?.name
  );

  const priestSlug = `Ksiądz: ${priest ? priest.username : "nieznany"}`;

  return (
    <>
      {editedEntrance && (
        <UpdateEntranceModal
          entrance={editedEntrance}
          onDismiss={hideModal}
          onUpdate={handleUpdateEntrance}
        />
      )}
      <Container>
        <Title>{priestSlug}</Title>

        {acolytes.map(({ id, username }) => (
          <Caption key={id}>{username}</Caption>
        ))}

        <FlatList
          data={Object.keys(splitedEntrances)}
          renderItem={({ item: streetName }) => (
            <StreetEntrancesGroup
              key={streetName}
              streetName={streetName}
              entrances={splitedEntrances[streetName]}
              onItemPress={showModal}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Visit;
