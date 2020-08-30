import React, { useState } from "react";
import { Entrance } from "../routes/Visit";
import ModalBase from "./ModalBase";
import {
  Title,
  Subheading,
  Button,
  TextInput,
  Switch,
} from "react-native-paper";
import { RecordState } from "@koleda/common/dist/generated/globalTypes";
import ButtonStateGroup from "../routes/ButtonStateGroup";
import { useMutation, gql } from "@apollo/client";
import {
  UpdateEntrance,
  UpdateEntranceVariables,
} from "../../generated/UpdateEntrance";
import { View } from "react-native";

type Props = {
  entrance: Entrance;
  onDismiss: () => void;
  onUpdate: (entrance: Entrance) => void;
};

type UpdateEntanceState = {
  state: RecordState;
  comment: string | null;
};

const UPDATE_ENTRANCE = gql`
  mutation UpdateEntrance($input: UpdateEntranceInput!) {
    updateEntrance(input: $input) {
      id
    }
  }
`;

const UpdateEntranceModal: React.FC<Props> = ({
  entrance,
  onDismiss,
  onUpdate,
}) => {
  const { house, visitState, comment } = entrance;

  const [updateEntrance] = useMutation<UpdateEntrance, UpdateEntranceVariables>(
    UPDATE_ENTRANCE
  );

  const [input, setInput] = useState<UpdateEntanceState>({
    state: visitState,
    comment,
  });

  const handleStateChange = (state: RecordState) =>
    setInput({ ...input, state });

  const handleCommentChange = (comment: string | null) =>
    setInput({ ...input, comment });

  const handleSubmit = () => {
    const variables = {
      input: {
        id: entrance.id,
        comment: input.comment,
        ["visitState"]: input.state,
      },
    };

    updateEntrance({
      variables,
    });

    const newEntrance = {
      ...entrance,
      ...variables.input,
    };

    onUpdate(newEntrance);
    onDismiss();
  };

  const houseNumber = house?.number || "";
  const streetName = house?.street?.name || "";
  const commentText = input.comment || "";

  return (
    <ModalBase visible onDismiss={onDismiss}>
      <Title>
        {houseNumber} {streetName}
      </Title>

      <TextInput
        value={commentText}
        dense
        label={"Komentarz"}
        onChangeText={(text) => handleCommentChange(text)}
      />
      <ButtonStateGroup onPress={handleStateChange} state={input.state} />

      <Button onPress={handleSubmit}>Zatwierdz</Button>
    </ModalBase>
  );
};

export default UpdateEntranceModal;
