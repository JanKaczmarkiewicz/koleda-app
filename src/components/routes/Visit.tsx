import React, { Fragment, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

import { RootStackParamList } from "./LoggedApp";
import {
  PastoralVisit,
  PastoralVisitVariables,
} from "../../generated/PastoralVisit";
import { RouteProp } from "@react-navigation/native";
import {
  List,
  Surface,
  Divider,
  Modal,
  Portal,
  Title,
} from "react-native-paper";
import { splitByLabel } from "../../utils/splitByLabel";
import { renderStateListIcon } from "./renderStateListIcon";
import Container from "../layout/Container";
import { Text } from "react-native";
import ModalBase from "../layout/ModalBase";

type VisitScreenRouteProp = RouteProp<RootStackParamList, "Visit">;

type Props = {
  route: VisitScreenRouteProp;
};

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

  const [editedEntranceId, setEditedEntranceId] = useState<string | null>(null);

  const { loading, error, data } = useQuery<
    PastoralVisit,
    PastoralVisitVariables
  >(VISIT, {
    variables: { input: { id: visitId } },
  });

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.pastoralVisit) return <div>error</div>;

  const showModal = (id: string) => setEditedEntranceId(id);

  const hideModal = () => setEditedEntranceId(null);

  const { entrances } = data.pastoralVisit;

  const splitedEntrances = splitByLabel(
    entrances,
    ({ house }) => house?.street?.name
  );

  const editedEntrance =
    editedEntranceId && entrances.find(({ id }) => id === editedEntranceId);

  return (
    <>
      {editedEntrance && (
        <ModalBase onDismiss={hideModal} visible>
          <Title>Edytuj</Title>
        </ModalBase>
      )}
      <Container>
        {Object.keys(splitedEntrances).map((streetName) => (
          <Surface key={streetName}>
            <List.Section style={{ width: "100%" }}>
              <List.Subheader>{streetName}</List.Subheader>
              {splitedEntrances[streetName].map(
                ({ id, house, reeceState, visitState, comment }) => (
                  <Fragment key={id}>
                    <Divider />
                    <List.Item
                      onPress={() => showModal(id)}
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
                )
              )}
            </List.Section>
          </Surface>
        ))}
      </Container>
    </>
  );
};

export default Visit;
