import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import About from "../components/About";

const Drawer = createDrawerNavigator();
const Navig = () => {
  return (
    <Drawer.Navigator
      // drawerContent={}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen>name="About" commponent={About}</Drawer.Screen>
    </Drawer.Navigator>
  );
};
export default Navig;
