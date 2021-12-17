import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  min-height: 128px;
`;

export const ImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #0000001c;
`;

export const Content = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export const Price = styled(Typography)`
  align-self: flex-end;
  margin-top: auto;
  font-weight: bold;
`;

export const Media = styled.img`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  align-self: center;
`;
