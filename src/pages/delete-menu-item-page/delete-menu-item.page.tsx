import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteMenuItemPage = () => {
  const { id: idFromPath = '-1' } = useParams();
  const id = parseInt(idFromPath, 10);
  const loading = false;
  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const handleDelete = useCallback(() => {}, [id]);

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
