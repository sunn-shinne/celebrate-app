import { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors, Radiuses } from "../constants/styles";
import { useQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { holidayApi } from "../../api/holidayApi";
import Holiday from "../components/holiday";

const WorldwideScreen = () => {
  const {
    data: holidays = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["world-wide-holidays"],
    queryFn: () => holidayApi.getUpcomingHolidaysWorldwide(),
  });

  const { data: countries = [], isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await holidayApi.getCountries(),
  });

  return (
    <View style={s.container}>
      <FlatList
        style={s.list}
        data={holidays}
        onRefresh={refetch}
        refreshing={isLoading}
        ListHeaderComponent={
          <View style={s.today}>
            <Text style={s.todayDate}>Международные праздники</Text>
            <Text style={s.statMessage}>в ближайшие 7 дней</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Holiday
            holiday={item}
            countryName={
              countries.find(
                (country) => country.countryCode === item.countryCode,
              ).name
            }
          />
        )}
        keyExtractor={(item, index) => `${item?.date}-${index}`}
        ListFooterComponent={<View style={s.footer} />}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  today: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 30,
    marginBottom: 8,

    backgroundColor: Colors.WHITE,
    borderBottomRightRadius: Radiuses.M,
    borderBottomLeftRadius: Radiuses.M,

    alignItems: "center",
  },
  todayDate: {
    fontSize: 20,
    marginBottom: 4,
  },
  stat: {
    width: "100%",
    paddingBottom: 30,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderTopRightRadius: Radiuses.M,
    borderTopLeftRadius: Radiuses.M,
  },
  statYear: {
    fontSize: 48,
    color: Colors.DARK_GREY,
  },
  statMessage: {
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.PRIMARY,
  },
  list: {
    flex: 1,
  },
  footer: {
    height: 24,
    backgroundColor: Colors.WHITE,
    borderBottomRightRadius: Radiuses.M,
    borderBottomLeftRadius: Radiuses.M,
  },
});

export default WorldwideScreen;
