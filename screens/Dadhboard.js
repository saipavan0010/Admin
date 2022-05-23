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
  Icon,
  IconButton,
  Divider,
  Stack,
  Menu,
  HamburgerIcon,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import SideBar from "../components/sidebar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Dashboard = ({ navigation }) => {
  const profileNav = () => {
    navigation.navigate("Profile");
  };

  const logout = () => {
    navigation.navigate("Login");
  };

  const changePassword = () => {
    navigation.navigate("ChangePassword");
  };
  const Listusers = () => {
    navigation.navigate("Listusers");
  };
  const Usermanagement = () => {
    navigation.navigate("Usermanagement");
  };

  return (
    <NativeBaseProvider>
      <Stack>
        <HStack flex={1}>
          <VStack flex={0.2}>
            <SideBar navigation={navigation}></SideBar>
          </VStack>

          <Box flex={0.8} flexDirection={"row"}>
            <Box w="90%">
              <Box flexDirection={"row"}>
                <Menu
                  flexDirection={"row"}
                  w="190"
                  trigger={(triggerProps) => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                      >
                        <Center flex={1} px="3"></Center>
                        <HamburgerIcon h="60" size="7" />
                      </Pressable>
                    );
                  }}
                >
                  <Menu.Item>Arial</Menu.Item>
                  <Menu.Item>Nunito Sans</Menu.Item>
                  <Menu.Item>Roboto</Menu.Item>
                  <Menu.Item>Poppins</Menu.Item>
                  <Menu.Item>SF Pro</Menu.Item>
                  <Menu.Item>Helvetica</Menu.Item>
                  <Menu.Item isDisabled>Sofia</Menu.Item>
                  <Menu.Item>Cookie</Menu.Item>
                </Menu>

                <Center flex={70} alignItems={"center"}>
                  <Input
                    w={300}
                    placeholder="Search..."
                    width="100%"
                    mt="3"
                    borderRadius="4"
                    borderBottomColor={"black"}
                    borderLeftColor={"black"}
                    borderTopColor={"black"}
                    borderRightColor={"black"}
                    py="1"
                    px="3"
                    fontSize="14"
                    InputLeftElement={
                      <Icon
                        m="2"
                        ml="3"
                        size="6"
                        color="gray.400"
                        as={<MaterialIcons name="search" />}
                      />
                    }
                  />
                </Center>

                <Center flex={1} alignItems={"end"}>
                  <Icon
                    mt="1"
                    onPress={profileNav}
                    as={<MaterialCommunityIcons name="bell" />}
                    size={6}
                    color="black"
                  />
                </Center>
                <Center flex={5} alignItems={"flex-end"}>
                  <Icon
                    mt="1"
                    onPress={profileNav}
                    as={<MaterialIcons name="person" />}
                    size={8}
                    color="muted.400"
                  />
                </Center>
              </Box>

              <Divider w="1000" mt="4" thickness="2" bg="#e6e6e6"></Divider>
            </Box>
          </Box>
        </HStack>
      </Stack>
    </NativeBaseProvider>
  );
};
export default Dashboard;
