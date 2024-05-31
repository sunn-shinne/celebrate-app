import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radiuses } from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import RouteNames from "../constants/route-names";
import Button from "../components/button";
import Input from "../components/input";

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        <Image source={require("../../assets/logo.png")} style={s.logo} />
        <View style={s.form}>
          <Input
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            textContentType="emailAddress"
          />
          <Input
            secureTextEntry
            value={password}
            placeholder="Пароль"
            onChangeText={setPassword}
            textContentType="password"
          />

          <View style={s.buttonWrapper}>
            <Button title="Создать аккаунт" />
          </View>

          <View style={s.loginHint}>
            <Text>Уже есть акаунт?</Text>
            <Pressable onPress={() => navigation.navigate(RouteNames.Login)}>
              <Text style={s.loginText}>Авторизоваться</Text>
            </Pressable>
          </View>
        </View>
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
    paddingHorizontal: 60,
    paddingTop: 180,
  },
  logo: {
    width: 200,
    objectFit: "contain",
  },
  form: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  formTitle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 12,
  },
  button: {
    width: "100%",
    borderRadius: Radiuses.S,
  },
  buttonTitle: {
    fontSize: 16,
  },
  loginHint: {
    flexDirection: "row",
    gap: 4,
  },
  loginText: {
    fontSize: 14,
    color: Colors.SECONDARY,
  },
});

export default CreateAccountScreen;
