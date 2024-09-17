import { ReactNode } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { Timeframe } from '@ankr.com/chains-list';

import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { EChainView } from 'domains/chains/screens/ChainsListPage/components/ChainViewSelector';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';

import { NoResult } from '../NoResult';
import { GuardResolution } from '../GuardResolution';

export interface IChainsListProps<T> {
  chains: T[];
  children: ReactNode;
  isLoading?: boolean;
  view?: EChainView;
  isPublicLayout?: boolean;
  timeframe?: Timeframe;
}

export function ChainsList<T>({
  chains,
  children,
  isLoading,
  isPublicLayout = false,
  timeframe,
  view = EChainView.Cards,
}: IChainsListProps<T>) {
  const { classes, cx } = useChainListStyles(isPublicLayout);

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <div
      className={cx({
        [classes.rootCardView]: view === EChainView.Cards,
        [classes.rootListView]: view === EChainView.List,
      })}
    >
      {view === EChainView.List && (
        <div className={classes.listHeader}>
          <Typography color="textSecondary" variant="body3">
            Name
          </Typography>
          <Typography
            className={classes.listHeaderRequestsCol}
            color="textSecondary"
            variant="body3"
          >
            {timeframe
              ? `Requests (${getTimeframeValue(timeframe)})`
              : 'Requests'}
          </Typography>
          <GuardResolution protectedResolution="smDown">
            {!isPublicLayout && (
              <Typography color="textSecondary" variant="body3">
                Projects
              </Typography>
            )}
          </GuardResolution>
        </div>
      )}
      {children}
    </div>
  );
}
