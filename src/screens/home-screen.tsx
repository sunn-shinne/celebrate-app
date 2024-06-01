import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonsts } from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMainLayoutProps } from "../types/types";

const HomeScreen = ({ user, country }: IMainLayoutProps) => {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
