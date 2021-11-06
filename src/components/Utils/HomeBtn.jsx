import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import classes from './HomeBtn.module.css';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '../../hooks/global-context';

const HomeBtn = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();

  const loadAllCoins = () => {
    if (searchTerm !== '') setSearchTerm('');
  };

  return (
    <Link to="/" className={classes.btn} onClick={loadAllCoins}>
      <Button variant="dark" className="d-flex align-items-center">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="ml-2">See All</span>
      </Button>
    </Link>
  );
};

export default HomeBtn;
