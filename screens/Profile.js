import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Center,
  NativeBaseProvider,
  Icon,
  Avatar,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [data, SetData] = useState({});

  useEffect(() => {
    getImage();
    getData();
  }, []);

  const getData = async () => {
    try {
      const Value = await AsyncStorage.getItem("user");
      let object = JSON.parse(Value);
      SetData(object);
    } catch (e) {
      console.log(e);
    }
  };

  const getImage = async () => {
    try {
      const image = await AsyncStorage.getItem("image");
      if (image !== null) {
        setImage(image);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    //async
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      try {
        await AsyncStorage.setItem("image", result.uri); //async feed token
        // setImage(result.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <Center mt="5">
          <Avatar
            mt="5"
            ml="5"
            bg="green.500"
            size="2xl"
            source={{
              uri: image,
            }}
          >
            displaypic
          </Avatar>
          <Box ml="20" mt="-4">
            <Icon
              onPress={pickImage}
              as={<MaterialIcons name="photo-camera" />}
              size={8}
              ml="25"
              color="black.800"
            />
          </Box>
          <Box mt="12">
            <Text fontSize={18} bold mt="7">
              FirstName : {data.firstname}
            </Text>
            <Text fontSize={18} bold mt="7">
              LastName : {data.lastname}
            </Text>
            <Text fontSize={18} bold mt="7">
              Email : {data.email}
            </Text>
          </Box>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default Profile;
