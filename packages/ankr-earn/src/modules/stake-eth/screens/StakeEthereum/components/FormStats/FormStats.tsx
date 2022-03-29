import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';

interface IFormStatsProps {
  amount: BigNumber;
  tokenOut: string;
  tokenVariantsSlot?: ReactNode;
  isLoading?: boolean;
}

export const FormStats = ({
  amount,
  tokenOut,
  tokenVariantsSlot,
  isLoading,
}: IFormStatsProps): JSX.Element => {
  return (
    <>
      {tokenVariantsSlot}

      <StakeDescriptionContainer>
        <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

        <StakeDescriptionValue>
          <StakeDescriptionAmount
            isLoading={isLoading}
            symbol={tokenOut}
            value={amount.toFormat()}
          />
        </StakeDescriptionValue>
      </StakeDescriptionContainer>
    </>
  );
};
