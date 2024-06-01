import { Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteNames } from "../constants/route-names";
import HomeScreen from "../screens/home-screen";
import SettingsScreen from "../screens/settings-screen";
import WorldwideScreen from "../screens/worldwide-screen";
import { IMainLayoutProps } from "../types/types";
import { Colors } from "../constants/styles";

const MainStack = createNativeStackNavigator();

const MainNavigation = (props: IMainLayoutProps) => {
  return (
    <MainStack.Navigator initialRouteName={RouteNames.Home}>
      <MainStack.Screen
        name={RouteNames.Home}
        children={() => <HomeScreen {...props} />}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Image
              style={{ height: 30, objectFit: "contain", marginRight: 174 }}
              source={require("../assets/logo.png")}
            />
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate(RouteNames.Settings)}>
              <Ionicons
                name="settings-outline"
                color={Colors.SECONDARY}
                size={24}
              />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate(RouteNames.Worldwide)}
            >
              <Ionicons
                name="globe-outline"
                color={Colors.SECONDARY}
                size={24}
              />
            </Pressable>
          ),
        })}
      />

      <MainStack.Screen
        name={RouteNames.Settings}
        children={() => <SettingsScreen {...props} />}
        options={({ navigation }) => ({
          title: "Настройки",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                size={24}
                color={Colors.SECONDARY}
                name="arrow-back-outline"
              />
            </Pressable>
          ),
        })}
      />

      <MainStack.Screen
        name={RouteNames.Worldwide}
        component={WorldwideScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate(RouteNames.Home)}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={Colors.SECONDARY}
              />
            </Pressable>
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
