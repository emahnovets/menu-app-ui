import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback } from 'react';
import { useDeleteMenuItem } from 'pages/delete-menu-item-page/__generated__/delete-menu-item.mutation';
import { MenuItemsListDocument } from 'components/menu-items-list/__generated__/menu-items-list.query';
import { MenuItemDocument } from 'pages/edit-menu-item-page/__generated__/menu-item.query';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteMenuItemPage = () => {
  const { id: idFromPath = '-1' } = useParams();
  const id = parseInt(idFromPath, 10);
  const navigate = useNavigate();
  const [deleteMenuItemMutation, { loading }] = useDeleteMenuItem({
    onCompleted: () => navigate('/'),
    refetchQueries: [MenuItemsListDocument, MenuItemDocument],
  });
  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const handleDelete = useCallback(() => {
    deleteMenuItemMutation({ variables: { id } });
  }, [deleteMenuItemMutation, id]);

  return (
    <Dialog open onClose={handleCancel} data-cy="delete-confirmation-dialog">
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you want to delete menu item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} data-cy="cancel-button">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleDelete}
          autoFocus
          loading={loading}
          data-cy="delete-button"
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
