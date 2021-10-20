import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AccessTokenContext = createContext();

const initialAccessToken = localStorage.getItem('accessToken');

const initialPayload = initialAccessToken ? jwtDecode(initialAccessToken) : null;

const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [user, setUser] = useState(initialPayload);

  useEffect(() => {
    if (!accessToken) {
      localStorage.removeItem('accessToken');
      setUser(null);
    } else {
      const payload = jwtDecode(accessToken);
      setUser(payload);
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, user, setUser, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export { AccessTokenContext, AccessTokenProvider };
