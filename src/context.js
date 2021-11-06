import React, { useState } from 'react';

const AppContext = React.createContext();

const initCurr = localStorage.getItem('currency')
  ? localStorage.getItem('currency')
  : 'usd';

const initPage = sessionStorage.getItem('page')
  ? +sessionStorage.getItem('page')
  : 1;

const AppProvider = ({ children }) => {
  const [tablePageNo, setTablePageNo] = useState(initPage);
  const [detailsData, setDetailsData] = useState({});
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(initCurr);
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
        tablePageNo,
        setTablePageNo,
        detailsData,
        setDetailsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
