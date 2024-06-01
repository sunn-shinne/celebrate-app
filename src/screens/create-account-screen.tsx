import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  SectionListComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, Radiuses } from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { APP_AUTH, APP_DB } from "../../firebaseConfig";
import Toast from "react-native-toast-message";
import { RouteNames } from "../constants/route-names";
import DropDownPicker from "react-native-dropdown-picker";
import Holidays from "date-holidays";
import { doc, setDoc } from "firebase/firestore";

const hd = new Holidays();

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);

  const auth = APP_AUTH;
  const store = APP_DB;

  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);

  const handleCreateAccount = async () => {
    if (loading) {
      return;
    }

    if (email.length < 3) {
      Toast.show({
        type: "info",
        text1: "Введите email",
        autoHide: true,
      });
      return;
    }

    if (!country) {
      Toast.show({
        type: "info",
        text1: "Выберите страну",
        autoHide: true,
      });
      return;
    }

    if (password.length === 0) {
      Toast.show({
        type: "info",
        text1: "Введите пароль",
        autoHide: true,
      });
      return;
    }

    if (password.length < 8) {
      Toast.show({
        type: "info",
        text1: "Парольдолжен быть не меньше 8 символов",
        autoHide: true,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim(),
      );
      if (response.user) {
        await setDoc(doc(store, "users", auth.currentUser.uid), {
          countryCode: country,
          countryName: countries.find((item) => item.value === country).label,
        });
      }
    } catch (error) {
      Toast.show({
        type: "info",
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getCountries = () => {
    if (loading) {
      return;
    }

    try {
      const response = hd.getCountries("ru");
      if (response) {
        setCountries(
          Object.entries(response).map(([key, value]) => ({
            label: value,
            value: key,
          })),
        );
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Не удалось загрузить список стран",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => getCountries(), []);

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

          <DropDownPicker
            open={open}
            value={country}
            items={countries}
            setOpen={setOpen}
            setValue={setCountry}
            placeholder="Страна"
            style={{
              borderColor: Colors.GREAY,
              paddingHorizontal: 16,
              borderRadius: Radiuses.M,
            }}
            dropDownContainerStyle={{
              borderColor: Colors.GREAY,
              borderRadius: Radiuses.M,
            }}
            placeholderStyle={{ color: Colors.GREAY }}
          />

          <View style={s.buttonWrapper}>
            <Button
              title="Создать аккаунт"
              loading={loading}
              disabled={!countries.length}
              onPress={handleCreateAccount}
            />
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
    paddingTop: 120,
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
