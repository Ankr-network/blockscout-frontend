import { Skeleton } from '@mui/material';
import { BaseNavButton } from './BaseNavButton';
import {
  NavigationItem,
  NavigationProps,
} from './BaseNavButton/BaseNavButtonTypes';
import { useNavigationStyles } from './useNavigationStyles';

export const Navigation = ({ items, loading }: NavigationProps) => {
  const { classes } = useNavigationStyles();

  return (
    <nav>
      {items.map((item: NavigationItem) => {
        if (loading && !item.isDisabled) {
          return (
            <Skeleton
              key={`skeleton-${item.label}`}
              className={classes.skeleton}
              variant="rectangular"
            />
          );
        }

        return <BaseNavButton key={`button-${item.label}`} item={item} />;
      })}
    </nav>
  );
};
