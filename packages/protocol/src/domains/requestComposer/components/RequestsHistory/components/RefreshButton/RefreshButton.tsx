import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { Timer } from '../Timer';
import { intlRoot } from '../../const';
import { useRefreshButtonStyles } from './RefreshButtonStyles';
import { useRefreshButton } from './hooks/useRefreshButton';
import { RefreshButtonIcon } from '../RefreshButtonIcon';

const refreshButton = t(`${intlRoot}.refresh-button`);

export interface RefreshButtonProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const RefreshButton = ({
  isRefreshing,
  onRefresh: refresh,
}: RefreshButtonProps) => {
  const { isCountdownRun, isCountdownEnded, onRefresh, seconds } =
    useRefreshButton(refresh);

  const { classes } = useRefreshButtonStyles();

  return (
    <div className={classes.root}>
      {isCountdownRun && <Timer seconds={seconds} />}
      <Button
        className={classes.refreshButton}
        disabled={isCountdownRun}
        onClick={onRefresh}
        variant="outlined"
        startIcon={
          <RefreshButtonIcon
            isCountdownEnded={isCountdownEnded}
            isRefreshing={isRefreshing}
          />
        }
      >
        {refreshButton}
      </Button>
    </div>
  );
};
