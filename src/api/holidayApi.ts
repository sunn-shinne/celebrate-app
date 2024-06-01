import { holidayClient } from "./holidayClient";
import { ICountry, IHoliday } from "./types";

export const holidayApi = {
  getCountries: async (): Promise<ICountry[]> => {
    const { data } = await holidayClient.get("/api/v3/AvailableCountries");
    return data;
  },

  getHolidays: async (
    year: string,
    countryCode: string,
  ): Promise<IHoliday[]> => {
    const { data } = await holidayClient.get(
      `/api/v3/PublicHolidays/${year}/${countryCode}`,
    );
    return data;
  },

  getUpcomingHolidaysWorldwide: async (): Promise<IHoliday[]> => {
    const { data } = await holidayClient.get(
      `/api/v3/NextPublicHolidaysWorldwide`,
    );
    return data;
  },
};
