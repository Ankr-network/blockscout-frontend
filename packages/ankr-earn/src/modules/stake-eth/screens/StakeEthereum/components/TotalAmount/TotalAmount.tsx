import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getTokenName } from 'modules/common/utils/getTokenName';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';

import { useTotalAmount } from '../../hooks/useTotalAmount';

interface ITotalAmountProps {
  amount?: BigNumber;
  fee?: BigNumber;
  isFeeLoading: boolean;
  isInvalidAmount: boolean;
}

export const TotalAmount = ({
  amount,
  fee,
  isFeeLoading,
  isInvalidAmount,
}: ITotalAmountProps): JSX.Element => {
  const { tokenOut, totalAmount } = useTotalAmount({
    amount,
    fee,
    isInvalidAmount,
  });

  return (
    <StakeDescriptionContainer>
      <StakeDescriptionName>{t('stake.you-will-receive')}</StakeDescriptionName>

      <StakeDescriptionValue>
        <StakeDescriptionAmount
          isLoading={isFeeLoading}
          symbol={getTokenName(tokenOut)}
          value={totalAmount.toFormat()}
        />
      </StakeDescriptionValue>
    </StakeDescriptionContainer>
  );
};
