import React from "react";
import BaseHeader from "./BaseHeader";
import { Appbar } from "react-native-paper";
import { useAuthContext } from "../context/Auth/AuthContext";

const LoggedHeader: React.FC = () => {
  const { logout } = useAuthContext();
  return (
    <BaseHeader>
      <Appbar.Action icon="logout" onPress={logout} />
    </BaseHeader>
  );
};

export default LoggedHeader;
