import React, { HTMLAttributes, ImgHTMLAttributes } from 'react';

import { Container } from './styles';

interface HeaderProps {
  img?: ImgHTMLAttributes<HTMLImageElement>;
  nav?: HTMLAttributes<HTMLElement>;
}

const Header: React.FC<HeaderProps> = ({ img, nav, children }) => {
  return (
    <Container>
      {children}
      {nav && <nav>{children}</nav>}
      {img && <img alt="img" />}
    </Container>
  );
};

export default Header;
