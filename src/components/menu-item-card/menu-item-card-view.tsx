import { MenuItem } from 'types/menu-item.interface';

import Typography from '@mui/material/Typography';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';
import {
  Content,
  ImagePlaceholder,
  Media,
  Price,
  StyledCard,
} from 'components/menu-item-card/menu-item-card.styles';
import { PRICE_DIVIDER } from 'consts/price.consts';

interface MenuItemCardProps {
  menuItem: MenuItem;
}

export const MenuItemCardView = ({ menuItem }: MenuItemCardProps) => {
  const price = Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: menuItem.currency,
  }).format(menuItem.price / PRICE_DIVIDER);

  return (
    <StyledCard>
      {menuItem.imageUrl ? (
        <Media src={menuItem.imageUrl} alt={menuItem.name} />
      ) : (
        <ImagePlaceholder>
          <LandscapeRoundedIcon />
        </ImagePlaceholder>
      )}
      <Content>
        <Typography variant="h5" component="div">
          {menuItem.name}
        </Typography>
        <Typography variant="body2">{menuItem.description}</Typography>
        <Price>{price}</Price>
      </Content>
    </StyledCard>
  );
};
