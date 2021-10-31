import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import { useLocation } from 'react-router-dom';
import { getCoinDetails } from '../../services/api';
import { formatCurrency } from '../../services/formatCurrency';
import TableComponent from '../../components/Table/Table';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Details = () => {
  const [tableData, setTableData] = useState({});
  const [coinDescription, setCoinDescription] = useState('');
  const [homepages, setHomePages] = useState([]);
  const { loading, setLoading, currency } = useGlobalContext();
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
          hashing_algorithm:
            res.data.hashing_algorithm,
          market_cap: formatCurrency(
            res.data.market_data?.market_cap?.eur,
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
    // added these dependencies so the console doesn't cry
  }, [location.pathname, setLoading]);

  return (
    <div className="m-5 pt-5">
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : (
        <>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} size="2x" /> To Home
          </Link>
          <TableComponent
            containerClassName="mt-4"
            headerData={Object.keys(tableData)}
            tableData={[tableData]}
            showPagination={false}
          />
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
        </>
      )}
    </div>
  );
};

export default Details;
