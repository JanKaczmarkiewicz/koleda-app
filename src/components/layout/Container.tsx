import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

const Container: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
  },
});

export default Container;
