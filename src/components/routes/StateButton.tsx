import React from "react";
import { RecordState } from "@koleda/common/dist/generated/globalTypes";
import { stateToIcon } from "./renderStateListIcon";
import { FAB } from "react-native-paper";

type Props = {
  state: RecordState;
  onPress?: () => void;
  blur?: boolean;
};

const StateButton: React.FC<Props> = ({ state, onPress, blur = false }) => {
  const { color, icon } = stateToIcon[state];
  return (
    <FAB
      icon={icon}
      style={{ backgroundColor: color, opacity: blur ? 1 : 0.5 }}
      onPress={onPress}
    />
  );
};

export default StateButton;
