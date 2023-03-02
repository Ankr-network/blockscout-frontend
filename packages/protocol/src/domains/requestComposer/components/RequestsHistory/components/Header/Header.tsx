import { Button, CircularProgress } from '@mui/material';
import { t } from '@ankr.com/common';

import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const title = t(`${intlRoot}.title`);
const refreshButton = t(`${intlRoot}.refresh-button`);

export const Header = ({ isRefreshing, onRefresh }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{title}</div>
      <Button
        className={classes.refreshButton}
        onClick={onRefresh}
        variant="outlined"
        startIcon={
          isRefreshing && <CircularProgress size={18} color="inherit" />
        }
      >
        {refreshButton}
      </Button>
    </div>
  );
};
