import React from "react";
import { Me_me } from "@koleda/common/dist/generated/Me";
import LoggedHeader from "../headers/LoggedHeader";
import Main from "./Main";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Visit from "./Visit";
import { SeasonProvider } from "@koleda/common";

const Stack = createStackNavigator();

interface Props {
  me: Me_me;
}

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Visit: { visitId: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

const LoggedApp: React.FC<Props> = (props) => {
  return (
    <SeasonProvider>
      <LoggedHeader />

      <NavigationContainer>
        <RootStack.Navigator headerMode={"none"} initialRouteName={"Home"}>
          <RootStack.Screen name="Home" component={Main} />
          <RootStack.Screen name="Visit" component={Visit} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SeasonProvider>
  );
};

export default LoggedApp;
