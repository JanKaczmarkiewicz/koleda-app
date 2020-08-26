import React from "react";
import { Portal, Surface, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";

interface Props {
  onDismiss: () => void;
  visible: boolean;
}

const ModalBase: React.FC<Props> = ({ onDismiss, children, visible }) => {
  return (
    <Portal>
      <Modal onDismiss={onDismiss} visible={visible}>
        <Surface style={styles.surface}>{children}</Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  surface: {
    width: 325,
  },
});

export default ModalBase;
