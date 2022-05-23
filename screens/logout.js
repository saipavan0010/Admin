import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Image,
  Pressable,
  Redirect,
} from "native-base";
import { useForm } from "react-hook-form";
import Signup from "./signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
const logout = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    let parsed = JSON.parse(user);

    console.log(parsed.token);
    console.log(parsed.token, "nooo");
    await AsyncStorage.removeItem("user", parsed.token);
    console.log(parsed.email, "yess");
  } catch (e) {
    navigation.navigate("Login");
  }
};

export default logout;
