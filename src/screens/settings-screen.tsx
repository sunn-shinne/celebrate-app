import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_AUTH, APP_DB } from "../../firebaseConfig";
import { useState } from "react";
import { Colors, Radiuses } from "../constants/styles";
import { doc, setDoc } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import Input from "../components/input";
import Button from "../components/button";
import { Ionicons } from "@expo/vector-icons";
import { signOut, updateEmail } from "firebase/auth";
import { IMainLayoutProps } from "../types/types";
import { holidayApi } from "../../api/holidayApi";
import { useQuery } from "@tanstack/react-query";

const SettingsScreen = ({
  user,
  country: currentCountry,
  setCountry: setCurrentCountry,
}: IMainLayoutProps) => {
  const auth = APP_AUTH;
  const store = APP_DB;

  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(currentCountry);
  const [email, setEmail] = useState<string>(user.email);
  const [open, setOpen] = useState(false);

  const { data: countries = [], isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await holidayApi.getCountries(),
  });

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
      const userCountry = {
        countryCode: country,
        countryName: countries.find((c) => c.countryCode === country).name,
      };
      await Promise.all([
        updateEmail(user, email),
        setDoc(doc(store, "users", user.uid), userCountry),
      ]);
      setCurrentCountry(country);
      Toast.show({
        type: "success",
        text1: "Изменения сохранены",
        autoHide: true,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <View>
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
            items={countries.map((item) => ({
              label: item.name,
              value: item.countryCode,
            }))}
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
            color={Colors.PRIMARY}
          />
        </View>
      </View>

      <Pressable onPress={() => signOut(auth)} style={s.exit}>
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
  user: { gap: 12, marginBottom: 48 },
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
