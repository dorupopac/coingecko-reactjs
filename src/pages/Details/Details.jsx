import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../hooks/global-context';
import { useLocation } from 'react-router-dom';
import { getCoinDetails } from '../../services/api';
import { formatCurrency } from '../../services/format-currency';
import TableComponent from '../../components/Table/Table';
import HomeBtn from '../../components/Utils/HomeBtn';
import { Spinner } from 'react-bootstrap';

const Details = () => {
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
  const coinDescription = useRef('');
  const homePages = useRef([]);

  useEffect(() => {
    if (searchTerm) setSearchTerm('');
  }, [searchTerm, setSearchTerm]);

  useEffect(() => {
    const coinId = location.pathname.substr(9);
    const getCoinDetailsParams = {};

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
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
          coinDescription.current = res.data.description.en;
          homePages.current = res.data.links.homepage;
        } else throw new Error("That coin doesn't exist!");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [location.pathname, setLoading, currency, setDetailsData, setError]);

  if (loading)
    return (
      <div className="m-sm-5 m-0 pt-5">
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      </div>
    );

  if (error)
    return (
      <div className="m-sm-5 m-0 pt-5">
        <HomeBtn />
        <h2 className="mt-4">{error}</h2>
      </div>
    );

  return (
    <div className="m-sm-5 m-0 pt-5">
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
              __html: coinDescription.current.replaceAll(
                '<a',
                '<a target="_blank" rel="noreferrer"'
              ),
            }}
          />
        )}
        <div className="d-flex flex-column">
          {homePages.current.map((page, i) => (
            <a key={page + i} href={page} target="_blank" rel="noreferrer">
              {page}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
