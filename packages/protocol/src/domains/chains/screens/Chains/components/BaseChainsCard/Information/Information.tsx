import { t } from '@ankr.com/common';

import { TimeframeSwitcher } from 'domains/chains/components/TimeframeSwitcher';
import { Timeframe } from 'domains/chains/types';

export interface IInformationProps {
  timeframe: Timeframe;
  switchTimeframe: () => void;
  totalRequests: string;
  timeframeClassName: string;
}

export const Information = ({
  timeframe,
  switchTimeframe,
  totalRequests,
  timeframeClassName,
}: IInformationProps) => {
  if (!totalRequests) {
    return null;
  }

  return (
    <>
      {t('chains.req', {
        value: totalRequests,
      })}{' '}
      <TimeframeSwitcher
        timeframe={timeframe}
        onSwitch={switchTimeframe}
        className={timeframeClassName}
      />
    </>
  );
};
