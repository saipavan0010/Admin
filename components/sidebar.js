import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Center,
  FormControl,
  Heading,
  Text,
  Pressable,
  Button,
  HStack,
  Popover,
  VStack,
  Card,
  Image,
  Icon,
  Divider,
  Stack,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SideBar = ({ navigation }) => {
  // const[data,SetData]=useState({})

  const [rol, setRol] = useState({});

  useEffect(() => {
    getdetails();
  }, []);

  const Dashboard = () => {
    navigation.navigate("Dashboard");
  };

  const Reports = () => {
    navigation.navigate("Reports");
  };

  //getting data from async storage
  //   const getData = async () => {
  //     try {
  //       const Value = await AsyncStorage.getItem("userDetail");
  //       let object = JSON.parse(Value); nmk
  //       console.log(object);
  //       SetData(object);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const getdetails = async () => {
    let user = await AsyncStorage.getItem("userDetail");
    let parseds = JSON.parse(user);

    // console.log(parseds.token);
    // let role = parsed.role;
    let ro = parseds.role;
    setRol(parseds);
    console.log(user);
  };

  const CreateAccount = () => {
    console.log(rol, "rrrrrrrrrr");
    //     navigation.navigate("CreateAccount")
    //   }
    if (rol.role === "superadmin") {
      console.log("hi");
      navigation.navigate("CreateAccount");
    } else if (rol.role == "Admin") {
      alert("This page is not accessable");
    }
  };

  //   if(data.role === "superadmin"){
  //     console.log(data.role,"wwwwwwwwwww")
  //     navigation.navigate("CreateAccount")
  //   }
  //   else{
  //     console.log("not allowed")
  //   }
  // console.log(data,"hhhhhhhhhh")
  // // navigation.navigate("CreateAccount")

  //logout
  const logout = () => {
    try {
      const Value = AsyncStorage.removeItem("userDetail");

      if (Value !== null) {
        console.log("logout successful");
      }
    } catch (e) {
      console.log(e);
    }
    navigation.navigate("Login");
  };
  //   AsyncStorage.removeItem("userId");

  const FAQ = () => {
    navigation.navigate("FAQScreens");
  };

  return (
    <NativeBaseProvider>
      
      <Box flex={1} backgroundColor={"#2f1b74"}>
        <Box flex={1} justifyContent={"flex-start"}>
          <VStack flex={1}>
            <HStack py="1.5" pl="8">
              <Text pl="6" pt="3" bold fontSize="16" color="red.500">
                SHADOW ADMIN
              </Text>
            </HStack>

            <Divider />

            <Box pr={60}>
              <Button
                backgroundColor={"#2f1b74"}
                onPress={() => navigation.navigate("Profile")}
              >
                Profile
              </Button>
            </Box>

            <Divider />
            <Box pr={36} justifyContent={"flex-start"}>
              <Button backgroundColor={"#2f1b74"} onPress={Dashboard}>
                Dashboard
              </Button>
            </Box>
            <Divider />
            <Box pr={50}>
              <Button backgroundColor={"#2f1b74"} onPress={Reports}>
                Reports
              </Button>
            </Box>
            <Divider />
            <Box pr={62} justifyContent={"flex-start"}>
              <Button backgroundColor={"#2f1b74"} onPress={FAQ}>
                FAQ's
              </Button>
            </Box>
            <Divider />
            <Box pr={50}>
              <Button backgroundColor={"#2f1b74"}>ListData</Button>
            </Box>
            <Divider />
            <Box pl={28} pr={29}>
              <Button backgroundColor={"#2f1b74"} onPress={() => {}}>
                ChangePassword
              </Button>
            </Box>
            <Divider />
            <Box pr={5}>
              <Button backgroundColor={"#2f1b74"} onPress={CreateAccount}>
                CreateAccount
              </Button>
            </Box>
            <Divider />
            <Box pt={210}>
              <Button backgroundColor={"#2f1b74"} onPress={logout}>
                Logout
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default SideBar;
