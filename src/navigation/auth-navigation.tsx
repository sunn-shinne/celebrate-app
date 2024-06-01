import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { RouteNames } from "../constants/route-names";
import CreateAccountScreen from "../screens/create-account-screen";
import LoginScreen from "../screens/login-screen";
import { Colors } from "../constants/styles";

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
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

export default AuthNavigation;
