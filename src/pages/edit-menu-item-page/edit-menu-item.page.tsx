import { MenuItemModal } from 'components/menu-item-modal';
import {
  MenuItemDocument,
  useMenuItem,
} from 'pages/edit-menu-item-page/__generated__/menu-item.query';
import { useUpdateMenuItem } from 'pages/edit-menu-item-page/__generated__/update-menu-item.mutation';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItem } from 'types/menu-item.interface';

export const EditMenuItemPage = () => {
  const { id: idFromPath = '-1' } = useParams();
  const id = parseInt(idFromPath, 10);
  const navigate = useNavigate();
  const { data } = useMenuItem({ variables: { id } });
  const menuItem = data?.getMenuItem ?? undefined;
  const [updateMenuItemMutation, { loading: isSubmitting }] = useUpdateMenuItem(
    {
      onCompleted: () => navigate('/'),
      refetchQueries: [MenuItemDocument],
    },
  );
  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const handleSave = useCallback(
    (values: Partial<Omit<MenuItem, 'id'>>) => {
      updateMenuItemMutation({
        variables: { id, ...values },
      });
    },
    [id, updateMenuItemMutation],
  );

  return (
    <MenuItemModal
      defaultValues={menuItem}
      onCancel={handleCancel}
      onSave={handleSave}
      isSubmitting={isSubmitting}
    />
  );
};
