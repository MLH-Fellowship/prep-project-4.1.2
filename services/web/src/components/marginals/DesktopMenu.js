import React, { useContext } from 'react';

// Libraries
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

// State Handlers
import { AccessTokenContext } from '../../store/contexts/accessToken.context';

// Assets
import logo from '../../mlh-prep.png';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 1000;
  height: 100vh;
  min-width: 190px;
  width: 15%;

  padding: 5rem 0rem;
  background: #373c3f;

  @media (min-width: 650px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const NavItem = styled(Link)`
  width: 100%;
  height: auto;
  padding: 0.4rem;

  text-decoration: none;
  color: #cbcbcb;
  margin-top: 0.8rem;
  padding: 0.3rem 1rem;

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

const MLHImg = styled.img`
  width: 65%;
  height: auto;
  margin-bottom: 5rem;
  margin-left: 1rem;
`;

const LoginDiv = styled.div`
  width: 100%;
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const LoginItem = styled.h2`
  color: #cbcbcb;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

function DesktopMenu({ navigation }) {
  const history = useHistory();
  const { user, setAccessToken } = useContext(AccessTokenContext);

  const onLoginClick = () => {
    if (!user) {
      history.push('/login');
    } else {
      setAccessToken(null);
      history.push('/');
    }
  };

  return (
    <Container>
      <NavContainer>
        <MLHImg src={logo} alt='MLH Prep POD 4.1.2' />
        {navigation.map(({ href, src, text }) => (
          <NavItem to={href} key={text}>
            <Img src={src} alt={text} />
            <Item>{text}</Item>
          </NavItem>
        ))}
      </NavContainer>

      <LoginDiv onClick={onLoginClick}>
        <LoginItem>{!user ? 'Login via Google' : 'Logout'}</LoginItem>
      </LoginDiv>
    </Container>
  );
}

export default DesktopMenu;
