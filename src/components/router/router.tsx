import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from 'pages/home-page';
import { AppWrapper } from 'components/app-wrapper';
import { LoginPage } from 'pages/login-page';
import { useContext } from 'react';
import { UserContext } from 'components/user-context/user.context';
import { AdminPage } from 'pages/admin-page';
import { EditMenuItemPage } from 'pages/edit-menu-item-page';
import { DeleteMenuItemPage } from 'pages/delete-menu-item-page';
import { CreateMenuItemPage } from 'pages/create-menu-item-page';

export const Router = (): JSX.Element => {
  const currentUser = useContext(UserContext);

  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route index element={<Navigate replace to="menu-items" />} />
        <Route
          path="menu-items"
          element={currentUser ? <AdminPage /> : <HomePage />}
        >
          <Route index />
          {currentUser && (
            <>
              <Route path="create" element={<CreateMenuItemPage />} />
              <Route path=":id" element={<EditMenuItemPage />} />
              <Route path=":id/delete" element={<DeleteMenuItemPage />} />
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};
