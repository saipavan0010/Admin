import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
//import Newdashboard from "./screens/Dashboard";
import Navig from "./screens/drawer navigation";
import About from "./components/About";

import Signin from "./screens/signup";

import Dashboard from "./screens/Dadhboard";

import Profile from "./screens/profile";
import Splashscreen from "./screens/splash";

import Changepassword from "./screens/changepassword";
import Updatepassword from "./screens/updatepassword";
import Forgotpassword from "./screens/forgotpassword";
import FAQ from "./screens/FAQ";
import NewFAQ from "./screens/NewFaq";
import EditFAQ from "./screens/EditFAQ";
import Report from "./screens/Report";
import EditReport from "./screens/EditReport";
import SideBar from "./components/sidebar";
import Loginn from "./screens/Loginn";
import FeatureReq from "./screens/featurereq";
import UpdateFeature from "./screens/UpdateFeature";
import Sub from "./screens/Sub";
import UpdateSub from "./screens/updatesub";

// import Home from "./screens/Home";

import { createDrawerNavigator } from "@react-navigation/drawer";
import list from "./screens/list";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Sub"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SideBar}
          name="SideBar"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Navig}
          name="Navig"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={About}
          name="About"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Splashscreen}
          name="splashscreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Signin}
          name="Signin"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Profile}
          name="Profile"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Changepassword}
          name="Changepassword"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Updatepassword}
          name="Updatepassword"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Forgotpassword}
          name="Forgotpassword"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={list}
          name="list"
          options={{ headerShown: true }}
        />
        {/* <Stack.Screen
          component={Newdashboard}
          name="Newdashboard"
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          component={FAQ}
          name="FAQ"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={NewFAQ}
          name="NewFAQ"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EditFAQ}
          name="EditFAQ"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Report}
          name="Report"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EditReport}
          name="EditReport"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Loginn}
          name="Loginn"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={FeatureReq}
          name="FeatureReq"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UpdateFeature}
          name="UpdateFeature"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={Sub}
          name="Sub"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={UpdateSub}
          name="UpdateSub"
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
