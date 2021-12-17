import CardContent from '@mui/material/CardContent';
import { StyledCard } from 'components/menu-item-card/menu-item-card.styles';
import Skeleton from '@mui/material/Skeleton';

export const MenuItemCardSkeleton = () => (
  <StyledCard>
    <Skeleton variant="rectangular" height="100%" animation="wave" />
    <CardContent>
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" />
    </CardContent>
  </StyledCard>
);
