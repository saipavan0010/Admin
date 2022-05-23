import React, { useState, useEffect } from "react";
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
  Menu,
  Divider,
  Pressable,
  Avatar,
} from "native-base";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Forgotpassword = ({ navigation }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   const [Details, setDetails] = useState({});

  const onforgot = async (data) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(data);

      var raw = JSON.stringify({
        firstname: data.FirstName,
        lastname: data.LastName,
        email: data.email,
        password: data.password,
        otp: data.otp,
        //confirmpassword: dataconfir,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/forgotpass",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        AsyncStorage.setItem("user", JSON.stringify(data));
        console.log(data);

        // if (token == null) {
        //   return <Redirect to={Routes.Login} />;
        // }
        alert("password is succussfully updated");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
    }
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
            Enter the OTP
          </Heading>
        </Center>
        {/* <Center mt="10">
          <Image
            source={require("../assets/favicon.png")}
            alt="logo"
            h="150"
            w="200"
          />
        </Center> */}
        <Center mt="8">
          <form onSubmit={handleSubmit(onforgot)}>
            <VStack>
              <Box mt="5">
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <input
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
                  <FormControl.Label>otp</FormControl.Label>
                  <input
                    {...register("otp", {
                      required: true,
                    })}
                    placeholder="otp"
                  />
                  {errors.password?.type === "required" && "enter the otp"}
                </FormControl>
              </Box>
              <Box mt="5" mb="5">
                <FormControl>
                  <FormControl.Label> New Password</FormControl.Label>
                  <input
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
              <input color="black" type="submit" />
            </VStack>
          </form>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default Forgotpassword;
