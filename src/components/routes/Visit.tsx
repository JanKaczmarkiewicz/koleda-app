import React, { Fragment, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

import { RootStackParamList } from "./LoggedApp";

import {
  PastoralVisit,
  PastoralVisitVariables,
  PastoralVisit_pastoralVisit_entrances,
} from "../../generated/PastoralVisit";

import { RouteProp } from "@react-navigation/native";
import { List, Surface, Divider } from "react-native-paper";
import { utils } from "@koleda/common";
import { renderStateListIcon } from "./renderStateListIcon";
import Container from "../layout/Container";
import UpdateEntranceModal from "../modals/UpdateEntranceModal";
import { stringToColour } from "@koleda/common/dist/utils";

const { splitByLabel, sortByHouseNumber } = utils;

type VisitScreenRouteProp = RouteProp<RootStackParamList, "Visit">;

type Props = {
  route: VisitScreenRouteProp;
};

export type Entrance = PastoralVisit_pastoralVisit_entrances;

const VISIT = gql`
  query PastoralVisit($input: FindOneInput!) {
    pastoralVisit(input: $input) {
      id
      hour
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

  const { loading, error, data } = useQuery<
    PastoralVisit,
    PastoralVisitVariables
  >(VISIT, {
    variables: { input: { id: visitId } },
  });

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.pastoralVisit) return <div>error</div>;

  const showModal = (entrance: PastoralVisit_pastoralVisit_entrances) =>
    setEditedEntrance(entrance);

  const hideModal = () => setEditedEntrance(null);

  const { entrances } = data.pastoralVisit;

  const splitedEntrances = splitByLabel(
    entrances,
    ({ house }) => house?.street?.name
  );

  return (
    <>
      {editedEntrance && (
        <UpdateEntranceModal entrance={editedEntrance} onDismiss={hideModal} />
      )}
      <Container>
        {Object.keys(splitedEntrances).map((streetName) => (
          <Surface key={streetName}>
            <List.Section
              style={{
                width: "100%",
                backgroundColor: stringToColour(streetName),
              }}
            >
              <List.Subheader>{streetName}</List.Subheader>
              {sortByHouseNumber(
                splitedEntrances[streetName],
                ({ house }) => house?.number
              ).map((entrance) => {
                const { id, house, reeceState, visitState, comment } = entrance;
                return (
                  <Fragment key={id}>
                    <Divider />
                    <List.Item
                      onPress={() => showModal(entrance)}
                      title={house?.number}
                      description={comment}
                      right={() => (
                        <>
                          {renderStateListIcon(reeceState)}
                          {renderStateListIcon(visitState)}
                        </>
                      )}
                    />
                  </Fragment>
                );
              })}
            </List.Section>
          </Surface>
        ))}
      </Container>
    </>
  );
};

export default Visit;
