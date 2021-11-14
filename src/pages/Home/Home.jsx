import React, { useEffect } from 'react';
import TableComponent from '../../components/Table/Table';
import { Spinner } from 'react-bootstrap';
import { useGlobalContext } from '../../hooks/global-context';
import { getCoinsMarket } from '../../services/api';
import { formatCurrency } from '../../services/format-currency';

const Home = () => {
  const {
    loading,
    list,
    error,
    searchTerm,
    setLoading,
    setList,
    setError,
    currency,
    tablePageNo,
    setTablePageNo,
  } = useGlobalContext();

  useEffect(() => {
    const getCoinsMarketParams = {
      vs_currency: currency,
      per_page: 10,
      page: tablePageNo,
    };

    const fetchList = async () => {
      if (searchTerm.trim().length !== 0) return;
      setLoading(true);

      const res = await getCoinsMarket(getCoinsMarketParams);
      if (res.data && res.data.length !== 0) {
        setList(
          res.data.map(key => {
            return {
              id: key.id,
              image: key.image,
              name: key.name,
              symbol: key.symbol,
              current_price: formatCurrency(key.current_price, currency),
              high_24h: formatCurrency(key.high_24h, currency),
              low_24h: formatCurrency(key.low_24h, currency),
            };
          })
        );
        setError('');
      } else if (res.error) setError(res.error);
      else if (res.data.length === 0) setError('You reached the end.');

      setLoading(false);
    };
    fetchList();
    sessionStorage.setItem('page', tablePageNo);
  }, [searchTerm, tablePageNo, currency, setError, setList, setLoading]);

  const buildTableHeaderData = () =>
    Object.keys(list[0]).filter(key => key !== 'id');

  const handleNextTablePage = () => {
    setTablePageNo(prev => prev + 1);
  };

  const handlePrevTablePage = () => {
    setTablePageNo(prev => prev - 1);
  };

  return (
    <div className={`m-sm-5 m-0 ${searchTerm.length !== 0 ? 'pt-5' : ''}`}>
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : list.length > 0 ? (
        <TableComponent
          headerData={buildTableHeaderData()}
          tableData={list}
          prevPage={handlePrevTablePage}
          nextPage={handleNextTablePage}
          decrementButtonDisable={tablePageNo === 1}
          pageNo={tablePageNo}
          containerClassName={searchTerm.length !== 0 ? 'mt-4' : 'mt-5'}
        />
      ) : (
        <div style={{ color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default Home;
