import React from 'react';

// Libraries
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 1000;
  height: 100vh;
  min-width: 190px;
  width: 15%;

  padding: 0rem;
  padding-top: 5rem;
  background: #373c3f;

  @media (min-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  width: 100%;
  height: auto;
  padding: 0.4rem;

  text-decoration: none;
  color: #cbcbcb;
  margin-top: 0.8rem;
  padding: 0.3rem 0.8rem;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Img = styled.img`
  width: 20%;
  height: 100%;
  object-fit: auto;
  margin-right: 20px;
`;

const Item = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 1.25rem;
  color: #cbcbcb;

  &:hover {
    color: #fff;
  }
`;

function DesktopMenu({ navigation }) {
  return (
    <Container>
      {navigation.map(({ href, src, text }) => (
        <NavItem to={href} key={text}>
          <Img src={src} alt={text} />
          <Item>{text}</Item>
        </NavItem>
      ))}
    </Container>
  );
}

export default DesktopMenu;
