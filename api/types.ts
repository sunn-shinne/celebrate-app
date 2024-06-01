export enum IHolidayTypes {
  Public = "Public",
  Bank = "Bank",
  School = "School",
  Authorities = "Authorities",
  Optional = "Optional",
  Observance = "Observance",
}

export interface IHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: IHolidayTypes[];
}

export interface ICountry {
  countryCode: string;
  name: string;
}
