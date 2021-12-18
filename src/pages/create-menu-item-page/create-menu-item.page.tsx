import { MenuItemModal } from 'components/menu-item-modal';
import { MENU_ITEMS_QUERY } from 'consts/queries.consts';
import { createMenuItem } from 'queries/create-menu-item';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from 'types/menu-item.interface';

const defaultValues: Partial<Omit<MenuItem, 'id'>> = {
  isActive: true,
  currency: 'USD',
  price: 0,
};

export const CreateMenuItemPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMenuItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(MENU_ITEMS_QUERY);

      navigate('/');
    },
  });
  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const handleSave = useCallback(
    (values: Partial<Omit<MenuItem, 'id'>>) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <MenuItemModal
      defaultValues={defaultValues}
      onCancel={handleCancel}
      onSave={handleSave}
      isSubmitting={isLoading}
    />
  );
};
