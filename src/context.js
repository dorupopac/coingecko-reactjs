import React, { useState, useContext, useEffect } from 'react';
import { getCoinsMarket, getCoinDetails } from './services/api';
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
    const getCoinDetailsParams = {};

    const fetchList = async () => {
      setLoading(true);

      if (searchTerm.trim().length === 0) {
        const res = await getCoinsMarket(getCoinsMarketParams);
        if (res.data) {
          setList(
            res.data.map(key => {
              return {
                id: key.id,
                image: key.image,
                name: key.name,
                symbol: key.symbol,
                current_price: `€${key.current_price}`,
                high_24h: `€${key.high_24h}`,
                low_24h: `€${key.low_24h}`,
              };
            })
          );
          setError('');
        } else if (res.error) setError(res.error);
      }

      if (searchTerm.trim().length > 0) {
        const res = await getCoinDetails(searchTerm, getCoinDetailsParams);
        
        if (res.data) {
          setList([
            {
              id: res.data.id,
              image: res.data.image.small,
              name: res.data.name,
              symbol: res.data.symbol,
              current_price: `€${res.data.market_data.current_price.eur}`,
              high_24h: `€${res.data.market_data.high_24h.eur}`,
              low_24h: `€${res.data.market_data.low_24h.eur}`,
            },
          ]);
          setError('');
        } else if (res.error.response.status === 404) {
          setError('No coin matched your search criteria');
        } else {
          setError(`Error ${res.error}`);
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
        setLoading,
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
