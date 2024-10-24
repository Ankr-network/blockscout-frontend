import { ENotificationCategory } from 'multirpc-sdk';
import { Typography } from '@mui/material';

import { CategoryBadge } from '../CategoryBadge';
import { Timestamp } from '../Timestamp';
import { useHeaderStyles } from './useHeaderStyles';

export interface IHeaderProps {
  category: ENotificationCategory;
  timestamp: number;
  title: string;
}

const separator = '•';

export const Header = ({ category, timestamp, title }: IHeaderProps) => {
  const isUnknownCategory = category === ENotificationCategory.UNKNOWN;

  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <Typography color="" className={classes.title} variant="h6">
        {title}
      </Typography>
      <div className={classes.subtitle}>
        <CategoryBadge category={category} />
        {!isUnknownCategory && (
          <Typography color="textSecondary" variant="body3">
            {separator}
          </Typography>
        )}
        <Timestamp timestamp={timestamp} />
      </div>
    </div>
  );
};
