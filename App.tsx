import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./src/screens/home-screen";
import SettingsScreen from "./src/screens/settings-screen";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Colors, Radiuses } from "./src/constants/styles";
import { StackNames, RouteNames } from "./src/constants/route-names";
import CreateAccountScreen from "./src/screens/create-account-screen";
import LoginScreen from "./src/screens/login-screen";
import Toast, { InfoToast } from "react-native-toast-message";
import { User, onAuthStateChanged } from "firebase/auth";
import { APP_AUTH, APP_DB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { IMainLayoutProps } from "./src/types/types";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { holidayApi } from "./api/holidayApi";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const MainLayout = (props: IMainLayoutProps) => {
  return (
    <MainStack.Navigator initialRouteName={RouteNames.CreateAccount}>
      <MainStack.Screen
        name={RouteNames.Home}
        children={() => <HomeScreen {...props} />}
        options={({ navigation }) => ({
          title: "",
          // headerStyle: { backgroundColor: Colors.GREAY },
          headerShadowVisible: false, // applied here
          headerBackTitleVisible: false,
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
        children={() => <SettingsScreen {...props} />}
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

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
};

export default function App() {
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG));

  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<string>(null);

  const getUserCountry = async (user: User) => {
    if (loading) {
      return;
    }

    if (!user?.uid) {
      setCountry(null);
      return;
    }

    try {
      setLoading(true);
      const docRef = doc(APP_DB, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const country = docSnap.data();
        setCountry(country.countryCode);
      }
    } catch {
      Toast.show({
        type: "info",
        text1: "Не удалось загрузить вашу страну проживания",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(APP_AUTH, async (newUser) => {
      setUser(newUser);
      await getUserCountry(newUser);
    });
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={RouteNames.CreateAccount}>
            {user && country ? (
              <Stack.Screen
                name={StackNames.Main}
                options={{ headerShown: false }}
                children={() => (
                  <MainLayout
                    user={user}
                    country={country}
                    setCountry={setCountry}
                  />
                )}
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
                style={{ borderLeftColor: Colors.PRIMARY, width: "90%" }}
                text1Style={{
                  fontSize: 14,
                  fontWeight: "400",
                  borderRadius: Radiuses.S,
                }}
              />
            ),
            success: (props) => (
              <InfoToast
                {...props}
                style={{ borderLeftColor: Colors.SECONDARY, width: "90%" }}
                text1Style={{
                  fontSize: 14,
                  fontWeight: "400",
                  borderRadius: Radiuses.S,
                }}
              />
            ),
          }}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
