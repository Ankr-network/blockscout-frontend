import BigNumber from 'bignumber.js';

import { t } from 'common';

import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';

import { useTotalAmount } from '../../hooks/useTotalAmount';

interface ITotalAmountProps {
  amount?: BigNumber;
}

export const TotalAmount = ({ amount }: ITotalAmountProps): JSX.Element => {
  const { isFeeLoading, tokenOut, totalAmount } = useTotalAmount(amount);

  return (
    <StakeDescriptionContainer>
      <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

      <StakeDescriptionValue>
        <StakeDescriptionAmount
          isLoading={isFeeLoading}
          symbol={tokenOut}
          value={totalAmount.toFormat()}
        />
      </StakeDescriptionValue>
    </StakeDescriptionContainer>
  );
};
