import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import { useLocation } from 'react-router-dom';
import { getCoinDetails } from '../../services/api';
import TableComponent from '../../components/table/table';
import { Spinner } from 'react-bootstrap';
import './details.css';

const Details = () => {
  const { loading, setLoading } = useGlobalContext();
  const [tableData, setTableData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const coinId = location.pathname.substr(9);
    const getCoinDetailsParams = {};

    const fetchDetails = async () => {
      setLoading(true);
      const res = await getCoinDetails(coinId, getCoinDetailsParams);
      if (res.data) {
        setTableData({
          name: res.data.name,
          symbol: res.data.symbol,
          hashing_algorithm: res.data.hashing_algorithm,
          market_cap_eur: res.data.market_data?.market_cap?.eur,
          genesis_date: res.data.genesis_date,
        });
      }
      setLoading(false);
    };
    fetchDetails();
  }, []);

  return (
    <div className="p-5 details-page ">
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : (
        <TableComponent
          headerData={Object.keys(tableData)}
          tableData={[tableData]}
          showPagination={false}
        />
      )}
    </div>
  );
};

export default Details;
