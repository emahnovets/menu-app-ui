import { MenuItemCard } from 'components/menu-item-card';
import { MenuItemsList } from 'components/menu-items-list/menu-items-list';
import { Search } from 'components/search';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Search text={query} onChange={setQuery} />
      <MenuItemsList menuItemComponent={MenuItemCard} query={query} />
      <Outlet />
    </>
  );
};
