import { ReactNode, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Tooltip, Typography } from '@mui/material';
import { Timeframe } from '@ankr.com/chains-list';

import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { EChainView } from 'domains/chains/screens/ChainsListPage/components/ChainViewSelector';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { NoResult } from '../NoResult';
import { GuardResolution } from '../GuardResolution';
import { chainsListTranslation } from './translation';

export interface IChainsListProps<T> {
  chains: T[];
  children: ReactNode;
  isLoading?: boolean;
  view?: EChainView;
  isPublicLayout?: boolean;
  timeframe?: Timeframe;
  tooltipText?: string;
}

export function ChainsList<T>({
  chains,
  children,
  isLoading,
  isPublicLayout = false,
  timeframe,
  tooltipText,
  view = EChainView.Cards,
}: IChainsListProps<T>) {
  const { classes, cx } = useChainListStyles(isPublicLayout);

  const { keys, t } = useTranslation(chainsListTranslation);

  const requestsString = t(keys.requests);

  const requestsTitle = useMemo(() => {
    const timeframeValue = getTimeframeValue(timeframe);
    const requestsWithTimeframeString = timeframeValue
      ? t(keys.requestsTimeframe, {
          timeframeValue,
        })
      : requestsString;

    return requestsWithTimeframeString;
  }, [keys.requestsTimeframe, requestsString, t, timeframe]);

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
            {t(keys.name)}
          </Typography>
          <Typography
            className={classes.listHeaderRequestsCol}
            color="textSecondary"
            variant="body3"
          >
            {tooltipText ? (
              <Tooltip
                className={classes.tooltipWrapper}
                title={tooltipText}
                placement="top"
              >
                <span className={classes.tooltipText}>{requestsTitle}</span>
              </Tooltip>
            ) : (
              requestsTitle
            )}
          </Typography>
          {!isPublicLayout && (
            <GuardResolution protectedResolution="smDown">
              <Typography color="textSecondary" variant="body3">
                {t(keys.projects)}
              </Typography>
            </GuardResolution>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
