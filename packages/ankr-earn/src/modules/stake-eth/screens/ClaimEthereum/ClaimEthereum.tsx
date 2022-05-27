import { Box } from '@material-ui/core';

import { t, tHTML } from 'common';

import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { Container } from 'uiKit/Container';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';

import { ClaimForm } from './components/ClaimForm';
import { useClaimForm } from './hooks/useClaimForm';

export const ClaimEthereum = (): JSX.Element => {
  const {
    aETHcRatio,
    balance,
    isBalanceLoading,
    isLoading,
    selectedToken,
    totalAmount,
    isDisabled,
    closeHref,
    onSubmit,
    onTokenSelect,
  } = useClaimForm();

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container maxWidth="780px">
        <ClaimForm
          balance={balance}
          closeHref={closeHref}
          isBalanceLoading={isBalanceLoading}
          isLoading={isLoading}
          tokenIn={Token.ETH}
          tokenOut={selectedToken}
          tokenVariantsSlot={
            <TokenVariantList my={5}>
              <TokenVariant
                description={tHTML('stake-ethereum.aethb-descr')}
                iconSlot={<AETHBIcon />}
                isActive={selectedToken === Token.aETHb}
                isDisabled={isDisabled}
                title={t('unit.feth')}
                onClick={onTokenSelect(Token.aETHb)}
              />

              <TokenVariant
                description={tHTML('stake-ethereum.aethc-descr', {
                  ethRate: isBalanceLoading
                    ? '...'
                    : aETHcRatio.decimalPlaces(DEFAULT_FIXED).toFormat(),
                })}
                iconSlot={<AETHCIcon />}
                isActive={selectedToken === Token.aETHc}
                isDisabled={isDisabled}
                title={t('unit.aeth')}
                onClick={onTokenSelect(Token.aETHc)}
              />
            </TokenVariantList>
          }
          totalAmount={totalAmount}
          onSubmit={onSubmit}
        />
      </Container>
    </Box>
  );
};
