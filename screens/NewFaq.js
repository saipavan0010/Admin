import React, { useEffect, useState } from "react";

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
  Button,
  NativeBaseProvider,
  Flex,
  CardItem,
  ScrollView,
  Pressable,
  Modal,
  View,
  Divider,
  Icon,
  Item,
  Spacer,
  Container,
  FormControl,
  Image,
  Card,
} from "native-base";

//import Componentbar from "./component";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import Newtopbar from "./newtopbar";

const NewFAQ = ({ navigation }) => {
  const [details, SetDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = async () => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        "http://localhost:8080/getfaq",
        requestOptions
      );
      if (response.ok) {
        const userDetails = await response.json();

        SetDetails(userDetails);
        // {details.length}
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <Box>
        <HStack flex={4}>
          <Box flex={3.6}>
            <Box w={"100%"} backgroundColor={"#f3f4f6"} marginY="20">
              {details.map((item, index) => {
                return (
                  <Box w={"100%"} backgroundColor={"#f3f4f6"} py="5">
                    <Center>
                      <Box>
                        <Card
                          boxSize={150}
                          borderLeftWidth={20}
                          marginBottom={10}
                          width="2xl"
                        >
                          <Text bold>
                            Query :<Text fontWeight={200}> {item.query} </Text>
                            <br />
                            Answer :
                            <Text fontWeight={200}> {item.answer} </Text>
                          </Text>
                          <Center>
                            <Button onPress={() => setShowModal(true)}>
                              Update
                            </Button>
                            <Modal
                              isOpen={showModal}
                              onClose={() => setShowModal(false)}
                            >
                              <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>Edit Faq</Modal.Header>
                                <Modal.Body>
                                  <FormControl>
                                    <FormControl.Label>
                                      Querry
                                    </FormControl.Label>
                                    <Input />
                                  </FormControl>
                                  <FormControl mt="3">
                                    <FormControl.Label>
                                      Answer
                                    </FormControl.Label>
                                    <Input />
                                  </FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button.Group space={2}>
                                    <Button
                                      variant="ghost"
                                      colorScheme="blueGray"
                                      onPress={() => {
                                        setShowModal(false);
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onPress={() => {
                                        setShowModal(false);
                                      }}
                                    >
                                      Save
                                    </Button>
                                  </Button.Group>
                                </Modal.Footer>
                              </Modal.Content>
                            </Modal>
                          </Center>
                        </Card>
                      </Box>
                    </Center>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default NewFAQ;
