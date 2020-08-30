import React from "react";
import { RecordState } from "../../generated/globalTypes";
import { List, Colors, shadow } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon";

export const stateToIcon: {
  [key in keyof typeof RecordState]: { color: string; icon: IconSource };
} = {
  ACCEPTED: {
    color: Colors.green300,
    icon: "check",
  },
  REJECTED: {
    color: Colors.red300,
    icon: "close",
  },
  UNCERTAIN: {
    color: Colors.grey50,
    icon: "help",
  },
  UNKNOWN: {
    color: Colors.white,
    icon: () => <></>,
  },
};

export const renderStateListIcon = (state: RecordState) => {
  const { color, icon } = stateToIcon[state];

  return (
    <List.Icon
      style={{
        backgroundColor: color,
        borderRadius: 20,
      }}
      icon={icon}
    />
  );
};
