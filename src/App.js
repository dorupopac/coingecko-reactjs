import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import FourZeroFour from './pages/FourZeroFour/FourZeroFour';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/details/:id">
            <Details />
          </Route>
          <Route path="*">
            <FourZeroFour />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
