import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { IPolkadotRouteLoadableComponentProps } from 'modules/stake-polkadot/types';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { UnstakeFormFooter } from './components/UnstakeFormFooter';
import { useUnstakePolkadotData } from './hooks/useUnstakePolkadotData';

export const UnstakePolkadot = ({
  network,
}: IPolkadotRouteLoadableComponentProps): JSX.Element => {
  const {
    ethToken,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isSuccessOpened,
    isUnstakeLoading,
    maxAmountDecimals,
    polkadotToken,
    unstakeExtraValidation,
    unstakeLabel,
    onSuccessClose,
    onUnstakeFormClose,
    onUnstakeSubmit,
  } = useUnstakePolkadotData(network);

  const renderFormFooter = (amount: BigNumber): JSX.Element => (
    <UnstakeFormFooter
      amount={amount}
      isDisabled={isUnstakeLoading}
      network={network}
      polkadotToken={polkadotToken}
    />
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

        {fetchStatsError === null &&
          fetchStatsData !== null &&
          (!isSuccessOpened ? (
            <UnstakeDialog
              balance={fetchStatsData.ethTokenBalance}
              endText={unstakeLabel}
              extraValidation={unstakeExtraValidation}
              isDisabled={isUnstakeLoading}
              isLoading={isUnstakeLoading}
              maxAmountDecimals={maxAmountDecimals}
              renderFormFooter={renderFormFooter}
              token={ethToken}
              onClose={onUnstakeFormClose}
              onSubmit={onUnstakeSubmit}
            />
          ) : (
            <UnstakeSuccess infoText={unstakeLabel} onClose={onSuccessClose} />
          ))}
      </Container>
    </Box>
  );
};
