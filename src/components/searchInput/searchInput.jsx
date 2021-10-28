import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context';
import { useLocation, useHistory } from 'react-router-dom';
import './searchInput.css';

const SearchInput = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleRedirect = () => {
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
    handleRedirect();
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="search-coin">Search coin:</label>
        <input
          type="text"
          name="search-coin"
          id="search-coin"
          ref={searchValue}
        />
      </form>
    </>
  );
};
export default SearchInput;
