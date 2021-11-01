import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';
import { getSupportedCurrencies } from '../../services/api';
import { useGlobalContext } from '../../context';
import classes from './CurrencyInput.module.css';

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const { currency, currencyInput, setCurrencyInput } = useGlobalContext();
    const inputRef = useRef();

    useEffect(() => {
      setCurrencyInput('');
      inputRef.current.focus();
    }, [currency, setCurrencyInput]);

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type currency..."
          onChange={e => setCurrencyInput(e.target.value.trim().toUpperCase())}
          value={currencyInput}
          ref={inputRef}
        />
        <ul className={classes['list-unstyled']}>
          {React.Children.toArray(children).filter(
            child =>
              !currencyInput ||
              child.props.children.toUpperCase().startsWith(currencyInput)
          )}
        </ul>
      </div>
    );
  }
);

const CurrencyInput = () => {
  const [listOfCurrenciesVisible, setListOfCurrenciesVisible] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const { currency, setCurrency, setError, currencyInput, setCurrencyInput } =
    useGlobalContext();

  useEffect(() => {
    const currency = localStorage.getItem('currency');
    if (currency) setCurrency(currency);
  }, [setCurrency]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await getSupportedCurrencies();
        setCurrencies(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCurrencies();
  }, [setError]);

  const handleToggle = () => {
    if (currencyInput !== '') setCurrencyInput('');
    setListOfCurrenciesVisible(!listOfCurrenciesVisible);
  };

  const handleSelectCurrency = cur => {
    setCurrency(cur);
    localStorage.setItem('currency', cur);
  };

  return (
    <Dropdown onToggle={handleToggle} className="mr-3">
      <Dropdown.Toggle variant="outline-light" id="navbar-dark-example">
        {currency.toUpperCase()}
      </Dropdown.Toggle>

      {listOfCurrenciesVisible && (
        <Dropdown.Menu as={CustomMenu}>
          {currencies.map((cur, i) => {
            return (
              <Dropdown.Item
                key={cur + i}
                eventKey={cur + i}
                active={cur === currency}
                onSelect={() => handleSelectCurrency(cur)}
              >
                {cur.toUpperCase()}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};
export default CurrencyInput;
