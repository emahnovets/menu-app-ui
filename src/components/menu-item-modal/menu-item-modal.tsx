import { MenuItem } from 'types/menu-item.interface';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import SelectItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { FormEvent, useCallback } from 'react';

interface MenuItemModalProps {
  defaultValues?: Partial<MenuItem>;
  onSave: (values: Partial<Omit<MenuItem, 'id'>>) => void;
  onCancel: VoidFunction;
  isSubmitting: boolean;
}

export const MenuItemModal = ({
  defaultValues,
  onSave: handleSave,
  onCancel: handleCancel,
  isSubmitting,
}: MenuItemModalProps) => {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);

      handleSave({
        name: data.get('name') as string,
        description: (data.get('description') as string) || undefined,
        imageUrl: (data.get('imageUrl') as string) || undefined,
        isActive: !!data.get('isActive'),
        price: parseInt(data.get('price') as string, 10),
        currency: data.get('currency') as string,
      });
    },
    [handleSave],
  );

  return (
    <Dialog
      open
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      {defaultValues ? (
        <form onSubmit={handleSubmit}>
          <DialogTitle id="responsive-dialog-title">Edit menu item</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              defaultValue={defaultValues?.name}
              autoFocus
            />
            <TextField
              margin="normal"
              multiline
              fullWidth
              id="description"
              label="Description"
              name="description"
              defaultValue={defaultValues?.description}
              autoFocus
            />
            <TextField
              margin="normal"
              multiline
              fullWidth
              id="imageUrl"
              label="Image URL"
              name="imageUrl"
              defaultValue={defaultValues?.imageUrl}
              autoFocus
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={!!defaultValues?.isActive}
                  name="isActive"
                />
              }
              label="Active"
            />
            <Box sx={{ display: 'flex' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                type="number"
                defaultValue={defaultValues?.price}
                autoFocus
              />
              <FormControl
                sx={{
                  minWidth: 120,
                  marginLeft: '8px',
                  marginTop: '16px',
                  marginBottom: '8px',
                }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  label="Currency"
                  defaultValue={defaultValues?.currency}
                  name="currency"
                >
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancel}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              autoFocus
              variant="contained"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
};
