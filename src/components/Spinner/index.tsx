import React from 'react';

import { Container } from './styles';

const Spinner: React.FC = () => {
  return (
    <Container viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="3"
      />
    </Container>
  );
};

export default Spinner;
