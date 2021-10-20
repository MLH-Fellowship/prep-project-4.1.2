import React, { useContext } from 'react';

// Libraries
import { useHistory } from 'react-router-dom';

// State Handlers
import { AccessTokenContext } from '../../store/contexts/accessToken.context';

export const Login = () => {
  const { user } = useContext(AccessTokenContext);
  const history = useHistory();

  if (user) {
    history.push('/');
  }

  return (
    <button
      onClick={() =>
        (window.location.href = `${process.env.REACT_APP_BACKEND_HOST}/oauth/login_redirect`)
      }
      type='button'
    >
      Login via Google
    </button>
  );
};
