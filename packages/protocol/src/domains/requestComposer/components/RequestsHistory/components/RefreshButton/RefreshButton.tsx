import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { IPrivateLastRequestParams } from 'domains/chains/actions/private/fetchPrivateLatestRequests';

import { Timer } from '../Timer';
import { intlRoot } from '../../const';
import { useRefreshButtonStyles } from './RefreshButtonStyles';
import { useRefreshButton } from './hooks/useRefreshButton';
import { RefreshButtonIcon } from '../RefreshButtonIcon';

export interface RefreshButtonProps {
  isRefreshing: boolean;
  onRefresh: ({ group }: IPrivateLastRequestParams) => void;
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
        {t(`${intlRoot}.refresh-button`)}
      </Button>
    </div>
  );
};
