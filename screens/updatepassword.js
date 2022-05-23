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

const Updatepassword = ({ navigation }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const updatepassword = async (data) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(data);
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);

      console.log(parsed.token);
      let cemail = parsed.email;
      //setFirstname(cemail);
      var raw = JSON.stringify({
        firstname: data.FirstName,
        lastname: data.LastName,
        email: cemail,
        password: data.password,
        //confirmpassword: dataconfir,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/updatepass",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        // if (token == null) {
        //   return <Redirect to={Routes.Login} />;
        // }
        alert("password is succussfully updated");
        navigation.navigate("Dashboard");
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
            CHANGEPASSWORD
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
          <form onSubmit={handleSubmit(updatepassword)}>
            <VStack>
              <Box mt="5" mb="5">
                <FormControl>
                  <FormControl.Label>NewPassword</FormControl.Label>
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
export default Updatepassword;
