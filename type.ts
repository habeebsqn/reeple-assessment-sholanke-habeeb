export interface ConvertType {
  conversion_rate: number;
  baseCurrency: {code: string; amt: number};
  targetCurrency: {code: string; amt: number};
}

export interface CurrencyType {
  code: string;
  name: string;
  country: string;
}

export interface RootType {
  convert: ConvertType;
}
