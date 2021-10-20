import React from 'react';

// Libraries
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: none;
  width: 100%;
  max-width: 100vw;
  height: 100px;

  padding: 0rem;
  background: #373c3f;

  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  z-index: 1000;

  @media (min-width: 650px) {
    display: none;
  }

  @media (max-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const NavItem = styled(Link)`
  width: 25%;
  height: 100%;
  margin: 0px;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: #cbcbcb;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Img = styled.img`
  width: 40%;
  height: auto;
  object-fit: cover;
  margin-bottom: 15px;
`;

const Item = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #cbcbcb;

  &:hover {
    color: #fff;
  }
`;

const MobileMenu = ({ navigation }) => (
  <Container>
    {navigation.map(({ href, src, text }) => (
      <NavItem to={href} key={href}>
        <Img src={src} alt={text} />
        <Item>{text}</Item>
      </NavItem>
    ))}
  </Container>
);

export default MobileMenu;
