import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { User, onAuthStateChanged } from "firebase/auth";
import { APP_AUTH, APP_DB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CustomToast from "./src/components/custom-toast";
import Router from "./src/navigation/router";

SplashScreen.preventAutoHideAsync();

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
        type: "error",
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
        <Router user={user} country={country} setCountry={setCountry} />
        <CustomToast />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
