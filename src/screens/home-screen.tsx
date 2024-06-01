import { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors, Radiuses } from "../constants/styles";
import { IMainLayoutProps } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { holidayApi } from "../../api/holidayApi";

const HomeScreen = ({ user, country }: IMainLayoutProps) => {
  const today = new Date();
  // today.setMonth(4);

  const year = useMemo(() => today.getFullYear().toString(), [today]);

  const {
    data: holidays = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["holidays", country, year],
    queryFn: () => holidayApi.getHolidays(year, country),
    enabled: !!country,
  });

  const todaysHoliday = useMemo(
    () => holidays.find((item) => isSameDay(item.date, today)),
    [today, holidays],
  );

  const renderItem = ({ item }) => (
    <View style={s.holiday}>
      <View>
        <Text style={s.holidayDate}>{format(item.date, "dd")}</Text>
        <Text style={s.holidayMonth}>
          {format(item.date, "LLLL", { locale: ru })}
        </Text>
      </View>
      <Text style={s.holidayName}>{item?.localName}</Text>
    </View>
  );

  return (
    <View style={s.container}>
      <FlatList
        style={s.list}
        data={holidays}
        onRefresh={refetch}
        refreshing={isLoading}
        ListHeaderComponent={
          <>
            <View style={s.today}>
              <Text style={s.todayDate}>
                {format(today, "dd LLLL, iiii", { locale: ru })}
              </Text>

              {!todaysHoliday && (
                <Text style={{ fontSize: 12 }}>Сегодня праздника нет :(</Text>
              )}
              {todaysHoliday && (
                <Text style={{ fontStyle: "italic" }}>
                  {todaysHoliday.localName}
                </Text>
              )}
            </View>
            <View style={s.stat}>
              <Text style={s.statYear}>{year}</Text>
              <Text style={s.statMessage}>
                Празднуем праздников: {holidays?.length}
              </Text>
            </View>
          </>
        }
        renderItem={renderItem}
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
  holiday: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 24,
    alignItems: "center",

    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: Radiuses.M,
  },
  holidayDate: {
    alignSelf: "center",
    color: Colors.SECONDARY,
    fontSize: 32,
  },
  holidayMonth: {
    color: Colors.GREAY,
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center",
    width: 64,
  },
  holidayName: { fontSize: 18, flex: 1 },
  footer: {
    height: 24,
    backgroundColor: Colors.WHITE,
    borderBottomRightRadius: Radiuses.M,
    borderBottomLeftRadius: Radiuses.M,
  },
});

export default HomeScreen;
