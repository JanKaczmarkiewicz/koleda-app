import React from "react";
import { Portal, Surface, Modal } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  onDismiss: () => void;
  visible: boolean;
}

const ModalBase: React.FC<Props> = ({ onDismiss, children, visible }) => {
  return (
    <Portal>
      <Modal
        onDismiss={onDismiss}
        visible={visible}
        contentContainerStyle={styles.container}
      >
        <Surface style={styles.paper}>{children}</Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    margin: "auto",
  },
  paper: {
    padding: "20px",
  },
});

export default ModalBase;
