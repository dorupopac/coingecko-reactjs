import React, { useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { getCoinDetails } from '../../services/api';
import { formatCurrency } from '../../services/formatCurrency';
import { Button, Form, FormControl } from 'react-bootstrap';

const SearchInput = () => {
  const searchValue = useRef('');
  const location = useLocation();
  const history = useHistory();
  const { searchTerm, setSearchTerm, setLoading, setList, setError } =
    useGlobalContext();

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  useEffect(() => {
    const getCoinDetailsParams = {};

    const fetchList = async () => {
      if (searchTerm.trim().length < 1) return;
      setLoading(true);

      const res = await getCoinDetails(searchTerm, getCoinDetailsParams);
      if (res.data) {
        setList([
          {
            id: res.data.id,
            image: res.data.image.small,
            name: res.data.name,
            symbol: res.data.symbol,
            current_price: formatCurrency(
              res.data.market_data.current_price.eur,
              'eur'
            ),
            high_24h: formatCurrency(res.data.market_data.high_24h.eur, 'eur'),
            low_24h: formatCurrency(res.data.market_data.low_24h.eur, 'eur'),
          },
        ]);
        setError('');
      } else if (res.error.response.status === 404) {
        setError('No coin matched your search criteria');
      } else {
        setError(`Error ${res.error}`);
      }

      setLoading(false);
    };
    fetchList();
  }, [searchTerm, setError, setList, setLoading]);

  const redirectToHomepage = () => {
    if (location.pathname !== '/') {
      history.push('/');
    } else return;
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchTerm(
      searchValue.current.value
        .toLowerCase()
        .trim()
        .replace(/[^0-9a-z- ]/gi, '')
        .replaceAll(' ', '-')
    );
    redirectToHomepage();
  };

  return (
    <Form inline className="mr-5" onSubmit={handleSearch}>
      <FormControl
        type="text"
        placeholder="Search Coin by Name"
        className="mr-sm-2"
        ref={searchValue}
      />
      <Button type="submit" variant="outline-info">
        Search
      </Button>
    </Form>
  );
};
export default SearchInput;
