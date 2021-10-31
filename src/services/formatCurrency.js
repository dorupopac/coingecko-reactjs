import { currencyCodes } from './currencyCodes';

export const formatCurrency = (value, currency) => {
  if (currencyCodes.includes(currency.toLowerCase())) {
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 20,
    }).format(value);
  } else {
    return `${value} ${currency.toUpperCase()}`;
  }
};
