import { t } from '@ankr.com/common';

import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { Quote } from 'uiKit/Quote';

import { useUnclaimed } from './useUnclaimed';

export const Unclaimed = (): JSX.Element | null => {
  const { isLoading, token, amount, isShowed } = useUnclaimed();

  if (!isShowed) {
    return null;
  }

  const tokenName = getTokenSymbol(token);

  return (
    <>
      <StakeDescriptionContainer>
        <StakeDescriptionName>
          {t('stake-ethereum.unclaimed-label')}
        </StakeDescriptionName>

        <StakeDescriptionValue>
          <StakeDescriptionAmount
            isLoading={isLoading}
            symbol={tokenName}
            value={amount}
          />
        </StakeDescriptionValue>
      </StakeDescriptionContainer>

      <Quote mb={2.5}>
        {t('stake-ethereum.unclaimed-descr', { token: tokenName })}
      </Quote>

      <StakeDescriptionSeparator />
    </>
  );
};
