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
  Select,
  CheckIcon,
} from "native-base";

import { useForm } from "react-hook-form";
import Signup from "./signup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [Details, setDetails] = useState({});
  const [service, setService] = useState("");

  const onSubmit = async (data) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(data);
      var raw = JSON.stringify({
        firstname: data.FirstName,
        lastname: data.LastName,
        email: data.email,
        password: data.password,
        //confirmpassword: dataconfir,
        service: service,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/login",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        AsyncStorage.setItem("user", JSON.stringify(data));
        console.log(data);

        // if (token == null) {
        //   return <Redirect to={Routes.Login} />;
        // }
        navigation.navigate("Dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navSignin = () => {
    navigation.navigate("Signin");
  };
  const forgotPass = () => {
    navigation.navigate("Forgotpassword");
  };
  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <Center mt="60">
          <Heading
            size="lg"
            fontWeight="600"
            color="coo<NativeBaseProvider>lGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
        </Center>
        <Center mt="10">
          <Image
            source={require("../assets/sr.png")}
            alt="logo"
            h="150"
            w="200"
          />
        </Center>
        <Center mt="8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Box mt="5">
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <input
                    //autoComplete="off"
                    p="5"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i,
                    })}
                    placeholder="email"
                  />
                  {errors.email?.type === "required" && "email is required"}
                </FormControl>
              </Box>
              <Box mt="5" mb="5">
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <input
                    // autoComplete="off"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                    })}
                    placeholder="password"
                  />
                  {errors.password?.type === "required" &&
                    "password is required"}
                </FormControl>
                <Text fontSize={"xs"}>
                  Min 8 char and 1 uppercase and 1 number.
                </Text>
              </Box>
              <Box w="3/4" maxW="300">
                <FormControl>
                  <FormControl.Label>Service</FormControl.Label>
                  <Select
                    {...register("service", {
                      // required: true,
                      value: service,
                    })}
                    selectedValue={service}
                    minWidth="150"
                    accessibilityLabel="service"
                    placeholder="Choose Service"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setService(itemValue)}
                  >
                    <Select.Item label="Super Admin" value="SuperAdmin" />
                    <Select.Item label="Admin" value="Admin" />
                  </Select>
                </FormControl>
              </Box>
              <input color="black" type="submit" />
            </VStack>
          </form>

          <Center m="5">
            <Pressable onPress={forgotPass}>
              <Text bold fontSize="md">
                Forgot password
              </Text>
            </Pressable>
          </Center>

          <Box m="3" mt="3">
            <Button mt="2" onPress={navSignin}>
              Registration
            </Button>
          </Box>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
}
