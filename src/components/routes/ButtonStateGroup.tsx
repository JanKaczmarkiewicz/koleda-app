import React from "react";
import { RecordState } from "../../generated/globalTypes";
import { StyleSheet, View } from "react-native";
import StateButton from "./StateButton";

interface Props {
  onPress: (state: RecordState) => void;
  state: RecordState;
}

const ButtonStateGroup: React.FC<Props> = ({ state, onPress }) => {
  return (
    <View style={styles.root}>
      {[RecordState.ACCEPTED, RecordState.REJECTED, RecordState.UNCERTAIN].map(
        (buttonState) => (
          <StateButton
            key={buttonState}
            state={buttonState}
            onPress={() => onPress(buttonState)}
            blur={state === buttonState}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: "20px",
  },
});

export default React.memo(ButtonStateGroup);
