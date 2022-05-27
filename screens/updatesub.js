import React, { useState } from "react";
//import { SafeAreaView, StyleSheet, View } from "react-native";
//import { Card } from "react-native-paper";
//import AddIcon from "@mui/icons-material/Add";
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

const UpdateSub = ({ route, navigation }) => {
  const [firstnameset, setValuefirstname] = useState(
    route.params.paramKey.plannmae
  );

  const [lastnameset, setValuelastname] = useState(
    route.params.paramKey.details
  );
  const [support, setValueSupport] = useState(route.params.paramKey.status);
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
        plannmae: data.plannmae,
        details: data.details,
        status: data.status,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/UpdateSub",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        // if (token == null) {
        //   return <Redirect to={Routes.Login} />;
        // }
        alert("Subscription  is succussfully updated");
        // window.location.reload(false);

        navigation.dispatch(
          StackActions.replace("Subscription", {
            user: "Subscription",
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
                  <Box mt="9" mb="5" alignItems="center">
                    <FormControl>
                      <FormControl.Label>
                        {" "}
                        <Text color="black" bold fontSize="lg">
                          Plan
                        </Text>
                      </FormControl.Label>
                      <input
                        onChangeText={(value) => {
                          setValuefirstname(value);
                        }}
                        {...register("plannmae", { value: firstnameset })}
                      />
                      {/* {errors.FirstName?.type === "required" &&
                      "FirstName is required"} */}
                    </FormControl>
                  </Box>

                  <Box mt="9" mb="5" alignItems="center">
                    <FormControl>
                      <FormControl.Label>
                        <Text color="black" bold fontSize="lg">
                          Details{" "}
                        </Text>
                      </FormControl.Label>
                      <input
                        {...register("details", {
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

                    <Box mt="9" mb="5" alignItems="center">
                      <FormControl>
                        <FormControl.Label>
                          {" "}
                          <Text color="black" bold fontSize="lg">
                            Status
                          </Text>
                        </FormControl.Label>
                        <input
                          onChangeText={(value) => {
                            setValueSupport(value);
                          }}
                          {...register("status", { value: support })}
                        />
                        {/* {errors.FirstName?.type === "required" &&
                      "FirstName is required"} */}
                      </FormControl>
                    </Box>
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

export default UpdateSub;
