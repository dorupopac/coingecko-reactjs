import React, { useEffect, useState } from 'react';
import { getCoinsMarket } from '../../services/api';
import TableComponent from '../components/table/table';
import { Spinner } from 'react-bootstrap';
import './home.css';

const Home = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [tablePageNo, setTablePageNo] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoinsMarketParams = {
      vs_currency: 'eur',
      per_page: 10,
      page: tablePageNo,
    };

    const fetchList = async () => {
      setLoading(true);
      const res = await getCoinsMarket(getCoinsMarketParams);
      if (res.data)
        setList(
          res.data.map(key => {
            return {
              image: key.image,
              name: key.name,
              symbol: key.symbol,
              current_price: key.current_price,
              high_24h: key.high_24h,
              low_24h: key.low_24h,
            };
          })
        );
      else if (res.error) setError(res.error);
      setLoading(false);
    };
    fetchList();
  }, [tablePageNo]);

  return (
    <div className="p-5">
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : (
        <TableComponent
          headerData={Object.keys(list[0])}
          tableData={list}
          prevPage={() => setTablePageNo(prev => prev - 1)}
          nextPage={() => setTablePageNo(prev => prev + 1)}
          decrementButtonDisable={tablePageNo === 1}
          pageNo={tablePageNo}
        />
      )}
    </div>
  );
};

export default Home;
