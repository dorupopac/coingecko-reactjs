import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import SearchInput from '../SearchInput/SearchInput';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import classes from './Header.module.css';

const Header = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="d-flex justify-content-between"
      fixed="top"
      expand="lg"
    >
      <Navbar.Brand className="d-flex">
        <img
          alt=""
          src="/logo512.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <div className="ml-2">Coingecko App</div>
      </Navbar.Brand>
      <div className="d-flex align-items-center">
        <CurrencyInput />
        <div
          className={`d-flex align-items-center ${classes['header-anchor-styling']}`}
        >
          <SearchInput />
          <Nav.Link
            target="_blank"
            href="https://www.coingecko.com/api/documentations/v3"
            className={classes['header-small-info']}
          >
            Built with CoinGecko API
          </Nav.Link>
        </div>
      </div>
    </Navbar>
  );
};
export default Header;
