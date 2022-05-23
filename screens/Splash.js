import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button, NativeBaseProvider } from "native-base";
import { parse } from "react-native-svg";

const Splashscreen = ({ navigation }) => {
  // const [Details, setDetails] = useState();

  const splashscreen = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      console.log(user);
      //  setDetails(obj);
      console.log(parsed.token);

      if (parsed.token) {
        navigation.navigate("Dashboard");
      }
    } catch (e) {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    splashscreen();
  });

  return (
    <NativeBaseProvider>
      <Box>splashscreen</Box>
    </NativeBaseProvider>
  );
};
export default Splashscreen;
