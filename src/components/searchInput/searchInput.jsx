import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context';
import './searchInput.css';

const SearchInput = ({}) => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef('');

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const searchCoin = e => {
    e.preventDefault();
    setSearchTerm(searchValue.current.value.toLowerCase().trim().replace(' ', '-'));
  };

  return (
    <>
      <form className="search-form" onSubmit={searchCoin}>
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
