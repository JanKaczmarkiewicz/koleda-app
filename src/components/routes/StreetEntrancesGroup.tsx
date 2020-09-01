import React, { Fragment } from "react";
import { Entrance } from "./Visit";
import { Surface, List, Divider } from "react-native-paper";
import { stringToColour, sortByHouseNumber } from "@koleda/common/dist/utils";
import { renderStateListIcon } from "./renderStateListIcon";

type Props = {
  streetName: string;
  entrances: Entrance[];
  onItemPress: (entrance: Entrance) => void;
};

const StreetEntrancesGroup: React.FC<Props> = ({
  streetName,
  entrances,
  onItemPress,
}) => (
  <Surface key={streetName}>
    <List.Section
      style={{
        width: "100%",
        backgroundColor: stringToColour(streetName),
      }}
    >
      <List.Subheader>{streetName}</List.Subheader>
      {sortByHouseNumber(entrances, ({ house }) => house?.number).map(
        (entrance) => {
          const { id, house, reeceState, visitState, comment } = entrance;
          return (
            <Fragment key={id}>
              <Divider />
              <List.Item
                onPress={() => onItemPress(entrance)}
                title={house?.number}
                description={comment}
                right={() => (
                  <>
                    {renderStateListIcon(reeceState)}
                    {renderStateListIcon(visitState)}
                  </>
                )}
              />
            </Fragment>
          );
        }
      )}
    </List.Section>
  </Surface>
);

export default StreetEntrancesGroup;
