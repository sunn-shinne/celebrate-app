import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./src/screens/home-screen";
import SettingsScreen from "./src/screens/settings-screen";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Colors } from "./src/constants/styles";
import RouteNames from "./src/constants/route-names";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={RouteNames.Home}>
          <Stack.Screen
            name={RouteNames.Home}
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Что сегодня празднуем?",
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate(RouteNames.Settings)}
                >
                  <Ionicons
                    name="settings-outline"
                    color={Colors.SECONDARY}
                    size={24}
                  />
                </Pressable>
              ),
            })}
          />

          <Stack.Screen
            name={RouteNames.Settings}
            component={SettingsScreen}
            options={({ navigation }) => ({
              title: "Настройки",
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={24}
                    color={Colors.SECONDARY}
                  />
                </Pressable>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
