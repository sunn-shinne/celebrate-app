import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteNames, StackNames } from "../constants/route-names";
import AuthNavigation from "./auth-navigation";
import MainNavigation from "./main-navigation";
import { IMainLayoutProps } from "../types/types";

const Stack = createNativeStackNavigator();

export default function Router({
  user,
  country,
  setCountry,
}: IMainLayoutProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteNames.CreateAccount}>
        {user ? (
          <Stack.Screen
            name={StackNames.Main}
            options={{ headerShown: false }}
            children={() => (
              <MainNavigation
                user={user}
                country={country}
                setCountry={setCountry}
              />
            )}
          />
        ) : (
          <Stack.Screen
            name={StackNames.Auth}
            component={AuthNavigation}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
