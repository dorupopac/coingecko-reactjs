import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';

const FourZeroFour = () => {
  return (
    <section className="mt-5 text-center">
      <Alert variant="danger">
        <Alert.Heading>We could not find the page</Alert.Heading>
        <Link to="/">
          <Button variant="light" size="sm">
            Take me home
          </Button>
        </Link>
      </Alert>
    </section>
  );
};

export default FourZeroFour;
