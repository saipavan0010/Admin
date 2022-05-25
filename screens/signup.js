import * as React from "react";
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
  Select,
  CheckIcon,
} from "native-base";

import { InputAccessoryView } from "react-native";
import { useForm } from "react-hook-form";

const Signin = ({ navigation }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [data, setValue] = React.useState("");
  const [ema, setEma] = React.useState(false);
  const [confirmpassword, setConfirmpass] = React.useState(false);
  const [Role, setRole] = React.useState("");
  //   const [datapass, setValuepass] = React.useState("");
  //   const [dataconfir, setValueconfir] = React.useState("");
  //   const [datafirstname, setValuefstname] = React.useState("");
  //   const [datalastname, setValuelstname] = React.useState("");
  //   const handleChange = async () => {
  //     //console.log(data);
  //   }

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
        confirmpassword: data.confirmpassword,
        role: Role,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/signin",
        requestOptions
      );

      if (data.password == data.confirmpassword) {
        if (response.ok) {
          console.log(response, "zzzzzzzzzzzzzS");
          const data = await response.json();
          console.log(data, "qqqqqqqqqqqS");

          navigation.navigate("NewLogin");
        }
        if (response.status == 409) {
          setEma(true);
          alert("jhshgh");
        }
      } else if (data.password != data.confirmpassword) {
        setConfirmpass(true);
      }
    } catch (err) {
      console.log(err);

      setEma(true);
    }
  };

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       navigation.navigate("Login");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <NativeBaseProvider>
      <Box flex={1} m="10">
        <Center>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Signin
          </Heading>

          <Center mt="10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <Box mt="5">
                  <FormControl>
                    <FormControl.Label>FirstName</FormControl.Label>
                    <input
                      {...register("FirstName", {
                        required: true,
                        pattern: /^[a-zA-Z]{2,}$/i,
                      })}
                      placeholder="First Name"
                      //   onChangeText={(text) => {
                      //     setValuefstname(text);
                      //   }}
                      //   onChangeText={(value) =>
                      //     setValue({ ...data,
                      //     firstname: value })
                      //   }
                    />
                    {errors.FirstName?.type === "required" &&
                      "FirstName is required"}
                  </FormControl>
                </Box>
                <Box mt="5">
                  <FormControl>
                    <FormControl.Label>LastName</FormControl.Label>
                    <input
                      {...register("LastName", {
                        required: true,
                        pattern: /^[a-zA-Z]{2,}$/i,
                      })}
                      placeholder="Last Name"
                      //   onChangeText={(text) => {
                      //     setValuelstname(text);
                      //   }}
                    />
                    {errors.LastName?.type === "required" &&
                      "LastName is required"}
                  </FormControl>
                </Box>
                <Box mt="5">
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <input
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i,
                      })}
                      placeholder="email"
                      //   onChangeText={(text) => {
                      //     setValue(text);
                      //   }}
                    />

                    {errors.email?.type === "required" && "email is required"}
                    {ema ? (
                      <Text bold>
                        ENTER VALIDE EMAIL. This email is already used .
                      </Text>
                    ) : null}
                  </FormControl>
                </Box>

                <Box mt="5" mb="5">
                  <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <input
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      })}
                      placeholder="password"
                      //   onChangeText={(text) => {
                      //     setValuepass(text);
                      //   }}
                    />
                    {errors.password?.type === "required" &&
                      "password is required"}
                  </FormControl>
                  <Text fontSize={"xs"}>
                    Min 8 char and 1 uppercase and 1 number.
                  </Text>
                </Box>
                <Box mb="5">
                  <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <input
                      {...register("confirmpassword", {
                        required: true,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      })}
                      placeholder="password"
                    />
                    {errors.password?.type === "required" &&
                      "password is required"}
                    {/* {confirmpassword ? (
                        <Text bold>
                          enter valid password
                        </Text>
                      ) : null} */}
                  </FormControl>
                </Box>
                <Box mt="5" mb={5}>
                  <FormControl>
                    <FormControl.Label> Role </FormControl.Label>
                    <VStack alignItems="center" space={4}>
                      <Select
                        selectedValue={Role}
                        minWidth={300}
                        accessibilityLabel="Role"
                        placeholder="ROLE"
                        onValueChange={(itemValue) => setRole(itemValue)}
                        _selectedItem={{
                          bg: "white",
                          endIcon: <CheckIcon size={4} />,
                        }}
                      >
                        <Select.Item label="Super Admin" value="Super Admin" />
                        <Select.Item label="Admin" value="Admin" />
                      </Select>
                    </VStack>
                  </FormControl>
                </Box>
                <input type="submit" />
              </VStack>
            </form>
          </Center>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};
export default Signin;
