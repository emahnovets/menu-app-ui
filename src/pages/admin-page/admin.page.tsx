import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { MenuItemCard } from 'components/menu-item-card';
import { MenuItemsList } from 'components/menu-items-list/menu-items-list';
import { Link, Outlet } from 'react-router-dom';
import { AddButtonWrapper } from 'pages/admin-page/admin-page.styles';

export const AdminPage = () => (
  <>
    <MenuItemsList menuItemComponent={MenuItemCard} isAdminView />
    <Outlet />
    <AddButtonWrapper>
      <Fab component={Link} to="create" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </AddButtonWrapper>
  </>
);
