import {
  RevenueCatDuration,
  RevenueCatDurations,
  SupportedLanguage,
} from '@carrotrevolution/node';
import {CurrencyHelper} from './currency';

interface ProductCategoryItem {
  timeString: {
    [key: string]: string;
  };
  productIds: string[];
  duration: RevenueCatDuration;
}

export abstract class ProductHelper {
  private static categories: ProductCategoryItem[] = [
    {
      timeString: {
        [SupportedLanguage.FI]: '1 kuukausi',
        [SupportedLanguage.EN]: '1 month',
      },
      productIds: [
        'prod_HofjPquEO1UEG6',
        'prod_Hn5FJ26W6GAMr9',
        'prod_IHPK4wgbPlSOBE',
        'prod_IJz7W0GXHw8jmP',
        'ios_single_monthly_1',
        'android_single_monthly_1',
      ],
      duration: RevenueCatDuration.MONTHLY,
    },
    {
      timeString: {
        [SupportedLanguage.FI]: '3 kuukautta',
        [SupportedLanguage.EN]: '3 months',
      },
      productIds: [
        'prod_HofkudGvCnmor3',
        'prod_Hn5GDV5m8u2ioa',
        'ios_single_threemonth_1',
        'android_single_threemonth_1',
      ],
      duration: RevenueCatDuration.THREE_MONTH,
    },
    {
      timeString: {
        [SupportedLanguage.FI]: '6 kuukautta',
        [SupportedLanguage.EN]: '6 months',
      },
      productIds: [
        'prod_Hoflv82N0u3XUK',
        'prod_Hn5HjBU4IZrEQU',
        'prod_IJz4OVgKTv3mxH',
        'prod_IJz9IBzG2S9Idz',
        'ios_single_sixmonth_1',
        'android_single_sixmonth_1',
      ],
      duration: RevenueCatDuration.SIX_MONTH,
    },
    {
      timeString: {
        [SupportedLanguage.FI]: '1 vuosi',
        [SupportedLanguage.EN]: '1 year',
      },
      productIds: [
        'prod_IJz5teoPfkbPhv',
        'prod_IJz9M0c08Rb7tr',
        'prod_JFi4tLKCF8K3rm',
        'prod_JFi547p7fUEkN4',
        'android_single_yearly_1',
        'ios_single_yearly_1',
      ],
      duration: RevenueCatDuration.YEARLY,
    },
  ];

  static durationToMonths(duration: RevenueCatDuration): number {
    switch (duration) {
      case RevenueCatDuration.MONTHLY:
        return 1;
      case RevenueCatDuration.TWO_MONTH:
        return 2;
      case RevenueCatDuration.THREE_MONTH:
        return 3;
      case RevenueCatDuration.SIX_MONTH:
        return 6;
      case RevenueCatDuration.YEARLY:
        return 12;
      default:
        throw new Error(`Unable to cast ${duration} to months.`);
    }
  }

  static productCategory(productId: string) {
    return this.categories.find(c => c.productIds.includes(productId));
  }

  static validProductId(productId: string) {
    return !!this.productCategory(productId);
  }

  static productTimeString(productId: string, lang: SupportedLanguage) {
    const category = this.productCategory(productId);
    return category?.timeString[lang];
  }

  static promotionalDuration(productId: string) {
    const isPromoId = productId.startsWith('rc_promo');

    if (!isPromoId) {
      return undefined;
    }

    for (const duration of RevenueCatDurations) {
      const isDuration = productId.toLowerCase().endsWith(duration);
      if (isDuration) {
        return duration;
      }
    }

    return undefined;
  }

  static productTitle(productId: string, lang: SupportedLanguage) {
    const timeString = this.productTimeString(productId, lang);
    return `Carrot Kitchen ${timeString}`;
  }

  static productPriceText(
    productId: string,
    lang: SupportedLanguage,
    amount: number,
    currencyCode: string
  ) {
    const timeString = this.productTimeString(productId, lang);
    const priceText = CurrencyHelper.toSymbolString(currencyCode, amount);
    return `${priceText} / ${timeString}`;
  }
}
