import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { getCoinsMarket } from './services/api';

function App() {
  useEffect(() => {
    const getCoinsMarketParams = {
      vs_currency: 'eur',
      per_page: 10,
    };
    getCoinsMarket(getCoinsMarketParams);
  }, []);

  return null;
}

export default App;
