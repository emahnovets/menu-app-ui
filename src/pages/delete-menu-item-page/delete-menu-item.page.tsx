import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MENU_ITEMS_QUERY } from 'consts/queries.consts';
import { deleteMenuItem } from 'queries/delete-menu-item';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteMenuItemPage = () => {
  const { id = '-1' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteMenuItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(MENU_ITEMS_QUERY);

      navigate('/');
    },
  });
  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const handleDelete = useCallback(() => {
    mutate(parseInt(id, 10));
  }, [mutate, id]);

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
          loading={isLoading}
          data-cy="delete-button"
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
