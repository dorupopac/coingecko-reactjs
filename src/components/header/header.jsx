import React from 'react';
import { Navbar } from 'react-bootstrap';
import SearchInput from '../searchInput/searchInput';
import './header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="d-flex justify-content-between navbar">
      <Navbar.Brand className="d-flex">
        <img
          alt=""
          src="/logo512.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <div className="ml-2">Gecko Client</div>
      </Navbar.Brand>
      <div className="d-flex align-items-center">
        <SearchInput />
        <a
          href="https://www.coingecko.com/api/documentations/v3"
          target="_blank"
          rel="noreferrer"
          className="header-small-info"
        >
          Built with CoinGecko API
        </a>
      </div>
    </Navbar>
  );
};
export default Header;
