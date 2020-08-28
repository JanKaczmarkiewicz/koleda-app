import React from "react";
import { Entrance } from "../routes/Visit";
import ModalBase from "./ModalBase";
import { Title, Subheading, TextInput, Button } from "react-native-paper";

interface Props {
  entrance: Entrance;
  onDismiss: () => void;
}

const UpdateEntranceModal: React.FC<Props> = ({ entrance, onDismiss }) => {
  const { house } = entrance;

  return (
    <ModalBase visible onDismiss={onDismiss}>
      <Title>Edytuj</Title>
      <Subheading>
        {house?.number || ""} {house?.street?.name || ""}
      </Subheading>

      <Button onPress={onDismiss}>Zatwierdz</Button>
    </ModalBase>
  );
};

export default UpdateEntranceModal;
