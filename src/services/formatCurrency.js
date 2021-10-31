export const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 20,
  }).format(value);
};
