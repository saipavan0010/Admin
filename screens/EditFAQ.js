import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import {
  Box,
  Spacer,
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
  Container,
} from "native-base";
import { set, useForm } from "react-hook-form";
import { StackActions } from "@react-navigation/native";

const EditFAQ = ({ route, navigation }) => {
  const [firstnameset, setValuefirstname] = useState(
    route.params.paramKey.query
  );

  const [lastnameset, setValuelastname] = useState(
    route.params.paramKey.answer
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const editdetails = async (data) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // console.log(data);
      // let user = await AsyncStorage.getItem("user");
      // let parsed = JSON.parse(user);

      // console.log(parsed.token);
      //let cemail = route.params.paramKey.email;
      //setFirstname(cemail);
      var raw = JSON.stringify({
        // firstname: data.FirstName,
        // lastname: data.LastName,
        // email: cemail,
        query: data.query,
        answer: data.answer,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/editfaq",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        // if (token == null) {
        //   return <Redirect to={Routes.Login} />;
        // }
        alert("FAQ is succussfully updated");
        // window.location.reload(false);

        navigation.dispatch(
          StackActions.replace("FAQ", {
            user: "FAQ",
          })
        );
        // location.reload(true);
        // navigation.navigate("Dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <NativeBaseProvider>
      <Box backgroundColor={"amber.50"}>
        {/* {/ <Box h="80%" w="90%" alignItems="Center" > /}
        {/ <Card > /} */}
        <Box
          marginLeft={30}
          marginRight={10}
          marginTop={30}
          marginBottom={30}
          backgroundColor={"amber.100"}
          alignItems="center"
          justifyContent={"center"}
          borderRadius="30"
        >
          <Box>
            <Text fontFamily={"bold"} bold fontSize={"2xl"}>
              EDIT DETAILS
            </Text>
          </Box>
          <Box pt="6" h="90%" w="90%" alignItems="center">
            <Center mt="8">
              <form onSubmit={handleSubmit(editdetails)}>
                <VStack>
                  {/* <Box mt="9" mb="5">
                    <FormControl>
                      <FormControl.Label>
                        <Text color="black" bold fontSize="lg">
                          Email{" "}
                        </Text>
                      </FormControl.Label>
                      <input
                        {...register("email", {
                          required: true,
                         
                        })}
                        placeholder="email"
                        value={route.params.paramKey.email}
                        //   onChangeText={(text) => {
                        //     setValue(text);
                        //   }}
                      />
                      {errors.email?.type === "required" && "email is required"}
                    </FormControl>
                  </Box> */}

                  <Box mt="9" mb="5" alignItems="center">
                    <FormControl>
                      <FormControl.Label>
                        {" "}
                        <Text color="black" bold fontSize="lg">
                          Query
                        </Text>
                      </FormControl.Label>
                      <input
                        onChangeText={(value) => {
                          setValuefirstname(value);
                        }}
                        {...register("query", { value: firstnameset })}
                        // value={route.params.paramKey.firstname}

                        // onChangeText={(value) =>
                        //   setValue(value))}
                      />
                      {/* {errors.FirstName?.type === "required" &&
                      "FirstName is required"} */}
                    </FormControl>
                  </Box>

                  <Box mt="9" mb="5" alignItems="center">
                    <FormControl>
                      <FormControl.Label>
                        <Text color="black" bold fontSize="lg">
                          answer{" "}
                        </Text>
                      </FormControl.Label>
                      <input
                        {...register("answer", {
                          pattern: /^[a-zA-Z]{2,}$/i,
                          value: lastnameset,
                        })}
                        // value={route.params.paramKey.lastname}
                        onChangeText={(value) => {
                          setValuelastname(value);
                        }}
                      />
                      {/* {errors.LastName?.type === "required" &&
                      "LastName is required"} */}
                    </FormControl>
                  </Box>
                  <Box mt="10" mb="10" alignItems="center">
                    <input type="submit" />
                  </Box>
                </VStack>
              </form>
            </Center>

            {/* <Text bold fontSize="xl" bg="coolgray.800" px="9" pb="5" pt="5">
            FIRSTNAME : <Input value={route.params.paramKey.firstname} />
           </Text>
          
           <Text pt="5" bold fontSize="xl" bg="coolgray.800" px="9" pb="5" pt="5">
            LASTNAME : <Input value={route.params.paramKey.lastname} />
           </Text>
           
           <Text pt="5" bold fontSize="xl" bg="coolgray.800" px="9" pb="5" pt="5">
             EMAIL :<Input value={route.params.paramKey.email} />
          </Text> */}
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditFAQ;
