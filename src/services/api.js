import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: { Accept: 'application/json' },
});

const buildParams = params => {
  if (!params) return;

  const queryArr = Object.keys(params).map(key => {
    if (params[key] !== undefined) {
      return `${key}=${params[key]}`;
    }
    return key;
  });

  const finalQuery = `?${queryArr.join('&')}`;
  return finalQuery;
};

// TODO reqParams to be array
const validateParams = (params, reqParams) => {
  let isValid = params !== undefined;

  if (params) {
    const paramsArray = Object.keys(params);
    reqParams.forEach(reqParam => {
      if (!paramsArray.includes(reqParam)) {
        isValid = false;
        return;
      }
    });
  }
  return isValid;
};

export const getCoinsMarket = async params => {
  const isValid = validateParams(params, ['vs_currency']);
  if (isValid) {
    const parsedParams = buildParams(params);
    try {
      const res = await instance.get(`/coins/markets${parsedParams}`);
      if (res.error) return {};
      return { data: res.data };
    } catch (error) {
      return { error };
    }
  } else {
    return {
      error: 'Invalid call parameters',
    };
  }
};

export const getCoinDetails = async (subUrl, params) => {
  if (subUrl) {
    let parsedParams = buildParams(params);
    if (!parsedParams) parsedParams = '';
    try {
      const res = await instance.get(`/coins/${subUrl}${parsedParams}`);
      return { data: res.data };
    } catch (error) {
      return { error };
    }
  } else {
    return {
      error: 'Invalid call parameters',
    };
  }
};

export const getSupportedCurrencies = async () => {
  try {
    const res = await instance.get('/simple/supported_vs_currencies');
    return { data: res.data };
  } catch (err) {
    return { err };
  }
};
