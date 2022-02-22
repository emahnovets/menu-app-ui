import { MenuItemModal } from 'components/menu-item-modal';
import { useCreateMenuItem } from 'pages/create-menu-item-page/__generated__/create-menu-item.mutation';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from 'types/menu-item.interface';

const defaultValues: Partial<Omit<MenuItem, 'id'>> = {
  isActive: true,
  currency: 'USD',
  price: 0,
};

export const CreateMenuItemPage = () => {
  const navigate = useNavigate();
  const [createMenuItemMutation, { loading }] = useCreateMenuItem({
    onCompleted: () => navigate('/'),
  });

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleSave = useCallback(
    (values: Omit<MenuItem, 'id'>) => {
      createMenuItemMutation({ variables: { ...values } });
    },
    [createMenuItemMutation],
  );

  return (
    <MenuItemModal
      defaultValues={defaultValues}
      onCancel={handleCancel}
      onSave={handleSave}
      isSubmitting={loading}
    />
  );
};
