import BigNumber from 'bignumber.js';
import { WalletDownIcon } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { NUMBERS_FORMATTING_TRESHOLD } from '../../const';
import { Summary } from '../Summary';
import { SummaryWidget } from '../SummaryWidget';
import { TopUpButton } from './components/TopUpButton';
import { currentPointsWidgetTranslation } from './translation';

export interface ICurrentPointsWidgetProps {
  currentPoints: number;
  isLoading: boolean;
}

export const CurrentPointsWidget = ({
  currentPoints,
  isLoading,
}: ICurrentPointsWidgetProps) => {
  const isTopUpButtonDisabled = currentPoints <= 0 || isLoading;

  const { keys, t } = useTranslation(currentPointsWidgetTranslation);

  const formattedPoints = new BigNumber(currentPoints).toFormat();

  const [points, tooltip] =
    currentPoints < NUMBERS_FORMATTING_TRESHOLD
      ? [formattedPoints, undefined]
      : [t(keys.currentPoints, { currentPoints }), formattedPoints];

  return (
    <SummaryWidget
      actionButton={<TopUpButton isDisabled={isTopUpButtonDisabled} />}
      title={t(keys.title)}
    >
      <Summary
        Icon={WalletDownIcon}
        isLoading={isLoading}
        title={t(keys.currentPointsTitle)}
        tooltip={tooltip}
      >
        {points}
      </Summary>
    </SummaryWidget>
  );
};
