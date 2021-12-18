import { MenuItemModal } from 'components/menu-item-modal';
import { MENU_ITEMS_QUERY } from 'consts/queries.consts';
import { fetchMenuItem } from 'queries/fetch-menu-item';
import { patchMenuItem } from 'queries/patch-menu-item';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItem } from 'types/menu-item.interface';

export const EditMenuItemPage = () => {
  const { id = '-1' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery([MENU_ITEMS_QUERY, id], () =>
    fetchMenuItem(parseInt(id, 10)),
  );
  const { mutate, isLoading } = useMutation(patchMenuItem, {
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
      mutate({
        id: parseInt(id, 10),
        ...values,
      });
    },
    [id, mutate],
  );

  return (
    <MenuItemModal
      defaultValues={data}
      onCancel={handleCancel}
      onSave={handleSave}
      isSubmitting={isLoading}
    />
  );
};
