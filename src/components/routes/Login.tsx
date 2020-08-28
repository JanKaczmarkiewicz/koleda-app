import React, { memo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { context } from "@koleda/common";
import Container from "../layout/Container";
import TextInput from "../inputs/TextInput";

const { useAuthContext } = context;

const LoginScreen = () => {
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _onLoginPressed = () => {
    login({ email, password });
  };

  return (
    <Container>
      <Text>Zaloguj się</Text>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {},
});

export default memo(LoginScreen);
