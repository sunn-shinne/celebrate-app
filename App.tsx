import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./src/screens/home-screen";
import SettingsScreen from "./src/screens/settings-screen";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Colors, Radiuses } from "./src/constants/styles";
import { StackNames, RouteNames } from "./src/constants/route-names";
import CreateAccountScreen from "./src/screens/create-account-screen";
import LoginScreen from "./src/screens/login-screen";
import Toast, { InfoToast } from "react-native-toast-message";
import { User, onAuthStateChanged } from "firebase/auth";
import { CELEBRATE_AUTH, CELEBRATE_DB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const MainLayout = () => {
  return (
    <MainStack.Navigator initialRouteName={RouteNames.CreateAccount}>
      <MainStack.Screen
        name={RouteNames.Home}
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Что сегодня празднуем?",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate(RouteNames.Settings)}>
              <Ionicons
                name="settings-outline"
                color={Colors.SECONDARY}
                size={24}
              />
            </Pressable>
          ),
        })}
      />

      <MainStack.Screen
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
    </MainStack.Navigator>
  );
};

const AuthLayout = () => {
  return (
    <AuthStack.Navigator initialRouteName={RouteNames.CreateAccount}>
      <AuthStack.Screen
        name={RouteNames.CreateAccount}
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name={RouteNames.Login}
        component={LoginScreen}
        options={({ navigation }) => ({
          title: "",
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
    </AuthStack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [country, setCountry] = useState<string>(null);

  const getUsersCountry = async () => {
    const docRef = doc(CELEBRATE_DB, "users", CELEBRATE_AUTH.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCountry(docSnap.data().country);
    }
  };

  useEffect(() => {
    onAuthStateChanged(CELEBRATE_AUTH, (newUser) => {
      if (newUser.uid) {
        setUser(newUser);
        getUsersCountry();
      }
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={RouteNames.CreateAccount}>
          {user ? (
            <Stack.Screen
              name={StackNames.Main}
              component={MainLayout}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name={StackNames.Auth}
              component={AuthLayout}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast
        topOffset={60}
        config={{
          info: (props) => (
            <InfoToast
              {...props}
              style={{ borderLeftColor: Colors.PRIMARY }}
              text1Style={{
                fontSize: 14,
                fontWeight: "400",
                borderRadius: Radiuses.S,
              }}
            />
          ),
        }}
      />
    </SafeAreaProvider>
  );
}
