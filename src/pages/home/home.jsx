import React, { useEffect, useState } from 'react';
import { getCoinsMarket } from '../../services/api';
import TableComponent from '../components/table/table';
import { Spinner } from 'react-bootstrap';
import './home.css';

const Home = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCoinsMarketParams = {
      vs_currency: 'eur',
      per_page: 10,
    };

    const fetchList = async () => {
      const res = await getCoinsMarket(getCoinsMarketParams);
      if (res.data)
        setList(
          res.data.map(key => {
            return {
              name: key.name,
              image: key.image,
              symbol: key.symbol,
              current_price: key.current_price,
              high_24h: key.high_24h,
              low_24h: key.low_24h,
            };
          })
        );
      else if (res.error) setError(res.error);
    };
    fetchList();
  }, []);

  console.log(list);

  return (
    <div className="p-5">
      {list.length > 0 ? (
        <TableComponent headerData={Object.keys(list[0])} tableData={[]} />
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      )}
    </div>
  );
};

export default Home;
