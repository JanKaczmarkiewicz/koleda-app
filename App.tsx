import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import LoginCheck from "./src/components/routes/LoginCheck";
import { context } from "@koleda/common";
import { ApolloProvider } from "@apollo/client";

const { AuthProvider, client } = context;

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
