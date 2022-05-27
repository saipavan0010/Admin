import React, { useEffect, useState } from "react";
import { Button, Card, DataTable } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Input,
  Center,
  NativeBaseProvider,
  Flex,
  CardItem,
  ScrollView,
  FormControl,
  Pressable,
  View,
  Divider,
  Select,
  CheckIcon,
  Icon,
  Item,
  Spacer,
} from "native-base";

import { StyleSheet, TextInput, Modal } from "react-native";

const Table = ({ navigation }) => {
  const [details, SetDetails] = useState([]);
  const [masterData, setmasterData] = useState([]);

  const [set, setid] = useState(" ");
  const [searchTerm, setSearchTerm] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setvisible] = useState(false);
  const [limit, setLimit] = useState(5);
  const handleChange = (e) => {
    setSearch(e);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    onSubmit();
  }, [limit]);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.email
          ? item.email.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      SetDetails(newData);
      setSearch(text);
    } else {
      SetDetails(masterData);
      setSearch(text);
    }
  };

  const onSubmit = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        limit: limit,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        "http://localhost:8080/pagenation",
        requestOptions
      );
      if (response.ok) {
        const userDetails = await response.json();

        SetDetails(userDetails);
        setmasterData(userDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Newfun = (itemValue) => {
    const integ = parseInt(itemValue);
    setLimit(integ);
  };
  return (
    <NativeBaseProvider>
      <Box>
        <Center>
          <Text fontSize={30}> USER DETAILS </Text>
        </Center>
        <Box mt="5" ml={5} size="50px" flex={2}>
          <FormControl>
            <FormControl.Label> limit </FormControl.Label>

            <Select
              {...register("limit", {
                value: { limit },
              })}
              selectedValue={limit}
              placeholder="limit"
              onValueChange={(itemValue) => Newfun(itemValue)}
              _selectedItem={{
                bg: "danger.300",
                endIcon: <CheckIcon size={30} />,
              }}
            >
              <Select.Item label="10" value="10" width={25} />
              <Select.Item label="15" value="15" width={25} />
              <Select.Item label="20" value="20" width={25} />
              <Select.Item label="30" value="30" width={25} />
              <Select.Item label="50" value="50" width={25} />
              <Select.Item label="100" value="100" width={25} />
              <Select.Item label="150" value="150" width={25} />
            </Select>
          </FormControl>
        </Box>

        <Box alignItems="flex-end">
          <TextInput
            placeholder="search...."
            value={search}
            fontSize="25"
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilter(text)}
          />
        </Box>
        <Divider w="100%" mt="4" thickness="2" bg="black" />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ flex: 1, fontSize: 20, fontFamily: "bold" }}>
            EMAIL
          </Text>
          <Text style={{ flex: 1, fontSize: 20, fontFamily: "bold" }}>
            FIRSTNAME
          </Text>
          <Text style={{ flex: 1, fontSize: 20, fontFamily: "bold" }}>
            LASTNAME
          </Text>
        </View>
        <Divider w="100%" mt="4" thickness="2" bg="black" />
        <FlatList
          data={details}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: "Green",
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Card>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ flex: 1, fontSize: 15 }}>{item.email}</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{item.name.first}</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{item.name.last}</Text>

                <Button transparent>
                  <Text
                    onPress={() => {
                      setvisible(true);
                      console.log(item.email);
                    }}
                  >
                    view{" "}
                  </Text>
                </Button>
              </View>
            </Card>
          )}
        />
      </Box>
    </NativeBaseProvider>
  );
};
export default Table;

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderWidth: 2,
    paddingLeft: 10,
    margin: 35,
    borderColor: "#009688",
    backgroundColor: "white",
    placeholder: "search....",
    variant: " rounded",
    w: "60%",
    borderRadius: 15,
    maxWidth: "600px",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

const ModalPoup = ({ visible, children }) => {
  const [showModal, setshowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setshowModal(true);
    } else {
      setshowModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};
