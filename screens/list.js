import React, { useEffect, useState } from "react";
import { Button, Card, DataTable } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  Pressable,
  View,
  Divider,
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
  const handleChange = (e) => {
    setSearch(e);
  };

  useEffect(() => {
    onSubmit();
  }, []);

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
  // const styleSheet = StyleSheet.create({
  //   MainContainer: {
  //     flex: 1,
  //     backgroundColor: "white",
  //   },

  //   item: {
  //     paddingLeft: 15,
  //     paddingTop: 8,
  //     paddingBottom: 8,
  //   },

  //   itemText: {
  //     fontSize: 24,
  //     color: "black",
  //   },

  //   footerStyle: {
  //     borderTopColor: "red",
  //     borderTopWidth: 2,
  //     borderBottomColor: "red",
  //     borderBottomWidth: 2,
  //   },
  // });
  // const Footer_Component = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 44,
  //         width: "100%",
  //         backgroundColor: "#00BFA5",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text style={{ fontSize: 24, color: "white" }}>
  //         {" "}
  //         Sample FlatList Footer{" "}
  //       </Text>
  //     </View>
  //   );
  // };

  const onSubmit = async () => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        "http://localhost:8080/getall/alldetails/details",
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
  return (
    <NativeBaseProvider>
      <Box>
        <Center>
          <Text fontSize={30}> USER DETAILS </Text>
        </Center>

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
