import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/home-page';
import { AppWrapper } from 'components/app-wrapper';
import { LoginPage } from 'pages/login-page';
import { useContext } from 'react';
import { UserContext } from 'components/user-context/user.context';
import { AdminPage } from 'pages/admin-page';

export const Router = (): JSX.Element => {
  const currentUser = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<AppWrapper />}>
        <Route index element={currentUser ? <AdminPage /> : <HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
