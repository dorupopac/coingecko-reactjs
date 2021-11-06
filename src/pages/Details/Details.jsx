import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../hooks/global-context';
import { useLocation } from 'react-router-dom';
import { getCoinDetails } from '../../services/api';
import { formatCurrency } from '../../services/format-currency';
import TableComponent from '../../components/Table/Table';
import HomeBtn from '../../components/Utils/HomeBtn';
import { Spinner } from 'react-bootstrap';

const Details = () => {
  const [coinDescription, setCoinDescription] = useState('');
  const [homepages, setHomePages] = useState([]);
  const {
    loading,
    setLoading,
    currency,
    error,
    setError,
    searchTerm,
    setSearchTerm,
    detailsData,
    setDetailsData,
  } = useGlobalContext();
  const location = useLocation();

  useEffect(() => {
    if (error) setError('');
    if (searchTerm) setSearchTerm('');
  }, []);

  useEffect(() => {
    const coinId = location.pathname.substr(9);
    const getCoinDetailsParams = {};

    const fetchDetails = async () => {
      setLoading(true);
      const res = await getCoinDetails(coinId, getCoinDetailsParams);
      if (res.data) {
        setDetailsData({
          name: res.data.name,
          symbol: res.data.symbol,
          hashing_algorithm: res.data.hashing_algorithm,
          market_cap: formatCurrency(
            res.data.market_data?.market_cap?.[currency],
            currency
          ),
          genesis_date: res.data.genesis_date,
        });
        setCoinDescription(res.data.description.en);
        setHomePages(res.data.links.homepage);
      }
      setLoading(false);
    };
    fetchDetails();

    return () => setTimeout(() => setDetailsData({}), 200);
    // added these dependencies so the console doesn't cry
  }, [location.pathname, setLoading, currency]);

  return (
    <div className="m-sm-5 m-0 pt-5">
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : (
        <>
          <HomeBtn />
          <TableComponent
            containerClassName="mt-4"
            headerData={Object.keys(detailsData)}
            tableData={[detailsData]}
            showPagination={false}
          />
          <div className="p-3">
            {coinDescription && (
              <p
                dangerouslySetInnerHTML={{
                  __html: coinDescription.replaceAll(
                    '<a',
                    '<a target="_blank" rel="noreferrer"'
                  ),
                }}
              />
            )}
            <div className="d-flex flex-column">
              {homepages.map((page, i) => (
                <a key={page + i} href={page} target="_blank" rel="noreferrer">
                  {page}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
