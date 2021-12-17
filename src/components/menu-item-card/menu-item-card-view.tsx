import { MenuItem } from 'types/menu-item.interface';

import Typography from '@mui/material/Typography';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Actions,
  Content,
  StyledLink,
  ImagePlaceholder,
  Media,
  Price,
  StyledCard,
} from 'components/menu-item-card/menu-item-card.styles';
import { PRICE_DIVIDER } from 'consts/price.consts';
import { IconButton } from '@mui/material';

interface MenuItemCardProps {
  menuItem: MenuItem;
  isAdminView?: boolean;
}

export const MenuItemCardView = ({
  menuItem,
  isAdminView,
}: MenuItemCardProps) => {
  const price = Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: menuItem.currency,
  }).format(menuItem.price / PRICE_DIVIDER);

  return (
    <StyledCard className={menuItem.isActive ? '' : 'inactive'}>
      {menuItem.imageUrl ? (
        <Media src={menuItem.imageUrl} alt={menuItem.name} />
      ) : (
        <ImagePlaceholder>
          <LandscapeRoundedIcon />
        </ImagePlaceholder>
      )}
      <Content>
        {isAdminView && (
          <Actions>
            <StyledLink to={`${menuItem.id}`}>
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
            </StyledLink>

            <StyledLink to={`${menuItem.id}/delete`}>
              <IconButton>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </StyledLink>
          </Actions>
        )}
        <Typography variant="h5" component="div">
          {menuItem.name}
        </Typography>
        <Typography variant="body2">{menuItem.description}</Typography>
        <Price>{price}</Price>
      </Content>
    </StyledCard>
  );
};
