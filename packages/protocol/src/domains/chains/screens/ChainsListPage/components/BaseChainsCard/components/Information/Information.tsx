import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { Timeframe } from 'modules/chains/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';

import { informationTranslation } from './translation';

export interface IInformationProps {
  timeframe: Timeframe;
  totalRequests: string;
  isRequestsDisabled?: boolean;
  shouldShowDashInsteadOfRequestsString?: boolean;
}

export const Information = ({
  isRequestsDisabled,
  shouldShowDashInsteadOfRequestsString,
  timeframe,
  totalRequests,
}: IInformationProps) => {
  const { keys, t } = useTranslation(informationTranslation);

  const hasRequests = Number(totalRequests) > 0;

  const renderRequestsString = useCallback(() => {
    if (shouldShowDashInsteadOfRequestsString) {
      return '—';
    }

    if (hasRequests) {
      return t(keys.requestsValue, {
        value: totalRequests,
      });
    }

    return t(keys.noData);
  }, [
    hasRequests,
    keys.noData,
    keys.requestsValue,
    shouldShowDashInsteadOfRequestsString,
    t,
    totalRequests,
  ]);

  if (!totalRequests) {
    return null;
  }

  return (
    <>
      <Typography color="textSecondary" variant="body4" component="p">
        {t(keys.requestsTitle, {
          value: getTimeframeValue(timeframe),
        })}
      </Typography>
      <Typography
        variant="body3"
        color={
          hasRequests && !isRequestsDisabled ? 'textPrimary' : 'textSecondary'
        }
      >
        {renderRequestsString()}
      </Typography>
    </>
  );
};
