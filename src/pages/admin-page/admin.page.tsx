import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { MenuItemCard } from 'components/menu-item-card';
import { MenuItemsList } from 'components/menu-items-list/menu-items-list';
import { Link, Outlet } from 'react-router-dom';
import { AddButtonWrapper } from 'pages/admin-page/admin-page.styles';
import { Search } from 'components/search';
import { useState } from 'react';

export const AdminPage = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Search text={query} onChange={setQuery} />
      <MenuItemsList
        menuItemComponent={MenuItemCard}
        query={query}
        isAdminView
      />
      <Outlet />
      <AddButtonWrapper>
        <Fab
          component={Link}
          to="create"
          color="primary"
          aria-label="add"
          data-cy="create-menu-item-button"
        >
          <AddIcon />
        </Fab>
      </AddButtonWrapper>
    </>
  );
};
