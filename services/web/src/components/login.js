import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AccessTokenContext } from '../store/contexts/accessToken.context';

export const Login = () => {
  const { user, setAccessToken } = useContext(AccessTokenContext);
  const history = useHistory();

  return (
    <button
      onClick={() => {
        if (!user) {
          window.location.href = `${process.env.REACT_APP_BACKEND_HOST}/oauth/login_redirect`;
        } else {
          setAccessToken(null);
          history.push('/');
        }
      }}
      type='button'
    >
      {!user ? 'Login via Google' : 'Logout'}
    </button>
  );
};
