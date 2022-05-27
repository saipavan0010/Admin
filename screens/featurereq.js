import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Colors,
  DataTable,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
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
  Container,
  FormControl,
  Image,
} from "native-base";

const FeatureReq = ({ navigation }) => {
  const [details, SetDetails] = useState([]);

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
        "http://localhost:8080/getrequest",
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
                            <Text fontWeight={200}>{item.email}</Text>
                            <br />

                            <Text fontWeight={200}> {item.feature} </Text>

                            <Text fontWeight={200}> {item.state} </Text>
                          </Text>
                          <Button
                            marginLeft={2}
                            size="20"
                            onPress={() => {
                              navigation.navigate("UpdateFeature", {
                                paramKey: item,
                              });
                            }}
                          >
                            update
                          </Button>
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

export default FeatureReq;
