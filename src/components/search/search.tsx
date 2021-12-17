import TextField from '@mui/material/TextField';
import { Container } from 'components/menu-items-list/menu-items-list.styles';
import { ChangeEvent, useCallback } from 'react';

interface SearchProps {
  text: string;
  onChange: (text: string) => void;
}

export const Search = ({ text, onChange: handleSearch }: SearchProps) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleSearch(event.target.value);
    },
    [handleSearch],
  );

  return (
    <Container>
      <TextField
        margin="normal"
        fullWidth
        id="search"
        label="Search"
        name="search"
        value={text}
        onChange={handleChange}
      />
    </Container>
  );
};
