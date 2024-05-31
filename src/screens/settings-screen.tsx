import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CELEBRATE_AUTH } from "../../firebaseConfig";
import { useState } from "react";
import { Colors } from "../constants/styles";

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => CELEBRATE_AUTH.signOut()}>
        <Text style={{ color: Colors.SECONDARY, fontSize: 16 }}>Выйти</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;
