import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('usd');
  const [currencyInput, setCurrencyInput] = useState('');

  return (
    <AppContext.Provider
      value={{
        list,
        error,
        loading,
        searchTerm,
        setSearchTerm,
        setLoading,
        setList,
        setError,
        currency,
        setCurrency,
        currencyInput,
        setCurrencyInput,
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
