import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Form, FormControl } from 'react-bootstrap';

const SearchInput = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    searchValue.current.focus();
  }, []);

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
