import React from "react";
import {
  Center,
  NativeBaseProvider,
  VStack,
  Box,
  FormControl,
  Pressable,
  Image,
  Text,
  Heading,
  Button,
  Select,
  CheckIcon,
} from "native-base";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loginn = ({ navigation }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [Details, setDetails] = useState({});

  const onSubmit = async (data) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // console.log(Role);
      console.log(data);
      var raw = JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role,
        status: data.st,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log(raw);
      const response = await fetch(
        "http://localhost:8080/loginn",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        AsyncStorage.setItem("user", JSON.stringify(data));
        if (data.role == "super admin") {
          navigation.navigate("Dashboard");
        } else {
          navigation.navigate("SuperDashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navsignup = () => {
    navigation.navigate("Signin");
  };
  const forgotPassword = () => {
    navigation.navigate("Forgotpassword");
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Heading
          size="lg"
          fontWeight="600"
          color="Gray.800"
          _dark={{
            color: "warmGray.100",
          }}
        >
          Welcome
        </Heading>

        <Center mt="10">
          <Image
            source={require("../assets/sr.png")}
            alt="logo"
            h="150"
            w="150"
            borderRadius={10000}
          />
        </Center>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <Box mt="2">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i,
                  })}
                  placeholder="pavan@gmail.com"
                />
                {errors.email?.type === "required" && "email is required"}
              </FormControl>
            </Box>

            <Box mt="2" mb="2">
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <input
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  })}
                />
                {errors.password?.type === "required" && "password is required"}
              </FormControl>
              <Text fontSize={"xs"}>
                Min 8 char and 1 uppercase and 1 number.
              </Text>
            </Box>
            <input type="submit" />
          </VStack>
        </form>

        <Center m="5">
          <Pressable onPress={forgotPassword}>
            <Text bold fontSize="md">
              Forget password
            </Text>
          </Pressable>
        </Center>

        <Box m="3" mt="3">
          <Button mt="2" onPress={navsignup}>
            Registration
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};
export default Loginn;
