import React from "react";
import { Appbar } from "react-native-paper";

const BaseHeader: React.FC = ({ children }) => {
  return (
    <Appbar>
      <Appbar.Content title={"Koleda"} />
      {children}
    </Appbar>
  );
};

export default BaseHeader;
