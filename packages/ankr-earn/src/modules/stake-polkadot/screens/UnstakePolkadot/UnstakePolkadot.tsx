import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_FIXED } from 'modules/common/const';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { UnstakeUserWallet } from 'modules/stake/components/UnstakeUserWallet';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { EPolkadotNetworks } from '../../types';

import { UnstakeRenderFormFooter } from './components/UnstakeRenderFormFooter';
import { useUnstakePolkadotData } from './hooks/useUnstakePolkadotData';

interface IUnstakePolkadotProps {
  network: EPolkadotNetworks;
}

export const UnstakePolkadot = ({
  network,
}: IUnstakePolkadotProps): JSX.Element => {
  const {
    ethToken,
    isActiveSuccessForm,
    isActiveUnstakeForm,
    isActiveUserWalletForm,
    isFetchStatsLoading,
    isUnstakeLoading,
    fetchStatsData,
    fetchStatsError,
    maxAmountDecimals,
    networkName,
    polkadotToken,
    redeemPeriodTxt,
    userAmount,
    onSuccessClose,
    onUnstakeFormClose,
    onUnstakeSubmit,
    onUserWalletClose,
    onUserWalletExtraValidation,
    onUserWalletSubmit,
  } = useUnstakePolkadotData(network);

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => (
    <UnstakeRenderFormFooter amount={amount} polkadotToken={polkadotToken} />
  );

  if (isFetchStatsLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        {fetchStatsError !== null && <QueryError error={fetchStatsError} />}

        {fetchStatsError === null && fetchStatsData !== null && (
          <>
            {isActiveUnstakeForm && (
              <UnstakeDialog
                balance={fetchStatsData.ethTokenBalance}
                endText={redeemPeriodTxt}
                maxAmountDecimals={maxAmountDecimals}
                renderFormFooter={onRenderFormFooter}
                token={ethToken}
                onClose={onUnstakeFormClose}
                onSubmit={onUnstakeSubmit}
              />
            )}

            {isActiveUserWalletForm && (
              <UnstakeUserWallet
                endText={t('stake-polkadot.unstake.user-wallet-info', {
                  token: polkadotToken,
                  network: networkName,
                })}
                extraValidation={onUserWalletExtraValidation}
                isLoading={isUnstakeLoading}
                network={networkName}
                submitDisabled={isUnstakeLoading}
                token={polkadotToken}
                tokenAmountTxt={t('unit.token-value', {
                  value: userAmount?.decimalPlaces(DEFAULT_FIXED) ?? 0,
                  token: ethToken,
                })}
                onClose={onUserWalletClose}
                onSubmit={onUserWalletSubmit}
              />
            )}

            {isActiveSuccessForm && (
              <UnstakeSuccess
                infoText={redeemPeriodTxt}
                onClose={onSuccessClose}
              />
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
