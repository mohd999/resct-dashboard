import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '../features/auth/authSlice';
import { useRefreshTokenMutation } from '../services/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [triggerRefresh] = useRefreshTokenMutation();
  const [initialized, setInitialized] = useState(false); 
  
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
      setInitialized(true);
    } else {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        triggerRefresh(refreshToken)
          .unwrap()
          .then((res) => {
            Cookies.set('accessToken', res.accessToken, { path: '/', expires: 1 / 96 }); 
            Cookies.set('refreshToken', res.refreshToken, { path: '/', expires: 7 }); 
            dispatch(setCredentials({ accessToken: res.accessToken }));
            setInitialized(true);
          })
          .catch(() => {
            dispatch(logout());
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            setInitialized(true);
          });
        
      } else {
        dispatch(logout());
        setInitialized(true);
      }
    }
  }, []);
  return initialized;
};
