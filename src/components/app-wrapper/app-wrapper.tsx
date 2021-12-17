import { Link, Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useCallback, useContext } from 'react';
import { UserContext } from 'components/user-context/user.context';
import { useQueryClient } from 'react-query';
import { CURRENT_USER_QUERY } from 'consts/queries.consts';
import { ACCESS_TOKEN_KEY } from 'consts/localStorage.consts';

export const AppWrapper = () => {
  const currentUser = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    queryClient.invalidateQueries(CURRENT_USER_QUERY);
    navigate('/');
  }, [queryClient, navigate]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          {currentUser ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
