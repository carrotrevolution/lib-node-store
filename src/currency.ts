import {SupportedCurrency} from '@carrotrevolution/node';
import toSymbol from 'currency-symbol-map';

export abstract class CurrencyHelper {
  static toSymbolString(code: string, amount: number) {
    const symbol = toSymbol(code.toUpperCase());
    return `${symbol}${amount}`;
  }
}

export abstract class CurrencyConfigHelper {
  private static readonly CURRENCIES: {
    [key in SupportedCurrency]: {
      symbol: string;
      unitType: 100 | 1;
    };
  } = {
    [SupportedCurrency.EUR]: {
      symbol: '€',
      unitType: 100,
    },
    [SupportedCurrency.GBP]: {
      symbol: '£',
      unitType: 100,
    },
  };

  static currencyConfig(abb: SupportedCurrency) {
    const config = this.CURRENCIES[abb];
    if (!config) {
      throw new Error('Invalid currency!');
    }
    return config;
  }
}
