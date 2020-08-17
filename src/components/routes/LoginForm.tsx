import React, { memo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useAuthContext } from "../context/Auth/AuthContext";

const LoginScreen = () => {
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _onLoginPressed = () => {
    login({ email, password });
  };

  return (
    <>
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
    </>
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
