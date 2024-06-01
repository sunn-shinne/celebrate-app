import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import { IMainLayoutProps } from "../types/types";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { holidayApi } from "../../api/holidayApi";

const HomeScreen = ({ user, country }: IMainLayoutProps) => {
  const [date, setDate] = useState(new Date());

  const year = useMemo(() => date.getFullYear().toString(), [date]);

  const {
    data: holidays,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["holidays", country, year],
    queryFn: () => holidayApi.getHolidays(year, country),
    enabled: !!country,
  });

  return (
    <View style={s.container}>
      <View style={s.dateInfo}>
        <Text style={s.year}>{year}</Text>
        <Text>Празднуем {holidays.length} праздников!</Text>
      </View>

      <FlatList
        style={s.list}
        data={holidays}
        onRefresh={refetch}
        refreshing={isLoading}
        renderItem={({ item }) => <Text>{item?.localName}</Text>}
        keyExtractor={(item, index) => `${item?.date}-${index}`}
        ListFooterComponent={
          isLoading ? <ActivityIndicator /> : <View style={s.footer} />
        }
      />
      <StatusBar style="auto" />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.GREAY,
  },

  dateInfo: {
    // flex: 1,
    width: "100%",
    paddingTop: 15,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },

  year: {
    fontSize: 48,
    color: Colors.PRIMARY,
    fontStyle: "italic",
  },
  list: {
    flex: 1,
  },
  footer: {
    height: 24,
  },
});

export default HomeScreen;
