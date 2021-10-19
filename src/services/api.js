import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: { Accept: 'application/json' },
});

const buildParams = params => {
  if (!params) return '';

  const queryArr = Object.keys(params).map(key => {
    if (params[key]) {
      return (key = `${key}=${params[key]}`);
    }
  });

  const finalQuery = `?${queryArr.join('&')}`;
  return finalQuery;
};

export const getCoinsMarket = async params => {
  try {
    if (!params || !params.vs_currency) return;

    const parsedParams = buildParams(params);
    console.log(parsedParams);
    // return await instance.get(`/coins/markets${parsedParams}`);
  } catch (err) {
    console.error(err.message);
  }
};
