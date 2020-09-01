import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import LoginCheck from "./src/components/routes/LoginCheck";
import { AuthProvider, client } from "@koleda/common";
import { ApolloProvider } from "@apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <PaperProvider>
          <LoginCheck />
        </PaperProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
