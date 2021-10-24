import React, { useState, useContext, useEffect } from 'react';
import { getCoinsMarket } from './services/api';
// import { useCallback } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [tablePageNo, setTablePageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCoinsMarketParams = {
      vs_currency: 'eur',
      per_page: 10,
      page: tablePageNo,
    };

    const fetchList = async () => {
      setLoading(true);

      if (searchTerm.trim().length === 0) {
        const res = await getCoinsMarket(getCoinsMarketParams);
        if (res.data)
          setList(
            res.data.map(key => {
              return {
                image: key.image,
                name: key.name,
                symbol: key.symbol,
                current_price: `€${key.current_price}`,
                high_24h: `€${key.high_24h}`,
                low_24h: `€${key.low_24h}`,
              };
            })
          );
        else if (res.error) setError(res.error);
      } else {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${searchTerm}`
        );
        const data = await res.json();
        if (!data.error) {
          setList([
            {
              image: data.image.small,
              name: data.name,
              symbol: data.symbol,
              current_price: `€${data.market_data.current_price.eur}`,
              high_24h: `€${data.market_data.high_24h.eur}`,
              low_24h: `€${data.market_data.low_24h.eur}`,
            },
          ]);
        }
      }
      setLoading(false);
    };
    fetchList();
  }, [tablePageNo, searchTerm]);

  return (
    <AppContext.Provider
      value={{
        list,
        error,
        setTablePageNo,
        tablePageNo,
        loading,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
