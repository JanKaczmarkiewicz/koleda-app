import React from "react";
import BaseHeader from "./BaseHeader";
import { Appbar } from "react-native-paper";
import { useAuthContext } from "@koleda/common";

const LoggedHeader: React.FC = () => {
  const { logout } = useAuthContext();
  return (
    <BaseHeader>
      <Appbar.Action icon="logout" onPress={logout} />
    </BaseHeader>
  );
};

export default LoggedHeader;
