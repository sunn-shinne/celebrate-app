import { View, Text, StyleSheet } from "react-native";
import { IHoliday } from "../../api/types";
import { Colors, Radiuses } from "../constants/styles";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface IHolidayProps {
  holiday: IHoliday;
  countryName?: string;
}

const Holiday = ({ holiday, countryName }: IHolidayProps) => {
  return (
    <View style={s.holiday}>
      <View>
        <Text style={s.holidayDate}>{format(holiday.date, "dd")}</Text>
        <Text style={s.holidayMonth}>
          {format(holiday.date, "LLLL", { locale: ru })}
        </Text>
      </View>
      {!countryName && <Text style={s.holidayName}>{holiday?.localName}</Text>}
      {countryName && (
        <View style={s.holidayInfoWrap}>
          <Text style={s.holidayName}>{holiday?.localName}</Text>
          <Text style={s.holidayCountry}>{countryName}</Text>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
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
  holidayInfoWrap: { flex: 1, justifyContent: "center", paddingVertical: 4 },
  holidayName: { fontSize: 18, flex: 1 },
  holidayCountry: { fontSize: 12, flex: 1 },
});

export default Holiday;
