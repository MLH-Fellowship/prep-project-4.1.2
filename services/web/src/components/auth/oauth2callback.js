import { useContext, useEffect } from 'react';

// Libraries
import { useHistory, useLocation } from 'react-router-dom';

// State handlers
import { AccessTokenContext } from '../../store/contexts/accessToken.context';

export const Oauth2Callback = () => {
  const { setAccessToken } = useContext(AccessTokenContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    let url = `${process.env.REACT_APP_BACKEND_HOST}/oauth/oauth2callback?`;
    url += location.search.substr(1);

    fetch(url, { credentials: 'include' })
      .then(async (res) => res.json())
      .then((res) => {
        if (!res.result || !res.access_token) {
          throw new Error();
        }
        setAccessToken(res.access_token);
        history.push('/');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  }, [history, location, setAccessToken]);

  return null;
};
