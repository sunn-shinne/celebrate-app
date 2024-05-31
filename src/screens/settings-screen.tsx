import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CELEBRATE_AUTH, CELEBRATE_DB } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { Colors, Radiuses } from "../constants/styles";
import { doc, getDoc, setDoc } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import Holidays from "date-holidays";
import Toast from "react-native-toast-message";
import Input from "../components/input";
import Button from "../components/button";
import { Ionicons } from "@expo/vector-icons";
import { signOut, updateEmail } from "firebase/auth";
import { RouteNames, StackNames } from "../constants/route-names";

const hd = new Holidays();

const SettingsScreen = ({ navigation }) => {
  const auth = CELEBRATE_AUTH;
  const store = CELEBRATE_DB;

  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(null);
  const [email, setEmail] = useState<string>(auth.currentUser.email);
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);

  const handleUserUpdate = async () => {
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

    try {
      setLoading(true);
      await Promise.all([
        updateEmail(auth.currentUser, email),
        setDoc(doc(store, "users", auth.currentUser.uid), {
          country,
        }),
      ]);
      Toast.show({
        type: "success",
        text1: "Изменения сохранены",
        autoHide: true,
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Что-то пошло не так",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUsersCountry = async () => {
    const docRef = doc(CELEBRATE_DB, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCountry(docSnap.data().country);
    }
  };

  const getCountries = () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
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

  useEffect(() => {
    getUsersCountry();
    getCountries();
  }, []);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.user}>
        <Text style={s.userTitle}>Пользователь</Text>
        <Input
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
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

        <Button
          title="Сохранить"
          loading={loading}
          onPress={handleUserUpdate}
          disabled={!countries.length}
        />
      </View>
      <Pressable
        onPress={() => {
          signOut(auth);
          // navigation.navigate(StackNames.Auth);
        }}
        style={s.exit}
      >
        <Text style={{ color: Colors.SECONDARY, fontSize: 16 }}>Выйти</Text>
        <Ionicons name="exit-outline" size={18} color={Colors.SECONDARY} />
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 12,
  },
  user: { gap: 12 },
  userTitle: { fontSize: 16, fontWeight: "500", paddingHorizontal: 12 },
  exit: {
    marginBottom: 24,
    alignSelf: "center",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
});

export default SettingsScreen;
