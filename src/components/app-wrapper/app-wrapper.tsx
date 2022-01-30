import { Link, Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useCallback, useContext } from 'react';
import { UserContext } from 'components/user-context/user.context';
import { ACCESS_TOKEN_KEY } from 'consts/localStorage.consts';
import { useApolloClient } from '@apollo/client';

export const AppWrapper = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleLogout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    client.resetStore();
    navigate('/');
  }, [client, navigate]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          {currentUser ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              data-cy="logout-button"
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              data-cy="login-button"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
