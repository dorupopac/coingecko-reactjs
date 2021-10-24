import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import './fourZeroFour.css';

const FourZeroFour = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <Alert variant="danger">
          <Alert.Heading size="lg">We could not find the page</Alert.Heading>
        <Link to="/">
          <Button variant="light" size="sm">Take me home</Button>
        </Link>
        </Alert>
      </div>
    </section>
  );
};

export default FourZeroFour;
