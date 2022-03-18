import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { DECIMAL_PLACES } from 'modules/common/const';
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
      <Box mb={1.5} mt={5}>
        <StakeDescriptionName>
          {t('stake-ethereum.token-select-label')}
        </StakeDescriptionName>
      </Box>

      <Box mb={5}>{tokenVariantsSlot}</Box>

      <StakeDescriptionContainer>
        <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

        <StakeDescriptionValue>
          <StakeDescriptionAmount
            symbol={tokenOut}
            value={
              isLoading
                ? '...'
                : amount.decimalPlaces(DECIMAL_PLACES).toFormat()
            }
          />

          {tokenOut}
        </StakeDescriptionValue>
      </StakeDescriptionContainer>
    </>
  );
};
