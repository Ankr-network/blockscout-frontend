import { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { uid } from 'react-uid';

import { useCardListStyles } from './useCardListStyles';

interface CardListProps {
  className?: string;
  cardHeaderIcon: ReactElement;
  cardHeaderAdditionalItem?: ReactElement;
  title: string;
  listItems: ReactElement[];
}

export const CardList = ({
  className,
  cardHeaderIcon,
  cardHeaderAdditionalItem,
  title,
  listItems,
}: CardListProps) => {
  const { classes } = useCardListStyles();

  return (
    <div className={className}>
      <div className={classes.header}>
        {cardHeaderIcon}

        {cardHeaderAdditionalItem && cardHeaderAdditionalItem}
      </div>
      <Typography className={classes.title} variant="subtitle2">
        {title}
      </Typography>
      {listItems.map(item => (
        <div className={classes.listItem} key={uid(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};
