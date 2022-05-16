import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { ZERO } from 'modules/common/const';
import { getAPY } from 'modules/stake-eth/actions/getAPY';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { ETH_STAKING_AMOUNT_STEP } from 'modules/stake-eth/const';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';

import { TokenVariants } from './components/TokenVariants';
import { TotalAmount } from './components/TotalAmount';
import { Unclaimed } from './components/Unclaimed';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeEthereumStyles } from './useStakeEthereumStyles';

export const StakeEthereum = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStakeEthereumStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const { data: apyData } = useQuery({ type: getAPY });
  const apy = apyData ? new BigNumber(apyData) : ZERO;

  const {
    isCommonDataLoading,
    isFeeLoading,
    balance,
    fee,
    amount,
    minAmount,
    loading,
    tokenIn,
    tokenOut,
    onInputChange,
    onSubmit,
  } = useStakeForm();

  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatch(getCommonData());
    dispatch(getAPY());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatch]);

  const renderStats = useCallback(
    () => (
      <>
        <TokenVariants />

        <Unclaimed />

        <TotalAmount amount={amount} />
      </>
    ),
    [amount],
  );

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        <StakeForm
          isMaxBtnShowed
          balance={balance}
          feeSlot={
            <StakeFeeInfo
              isLoading={isFeeLoading}
              mt={-1.5}
              token={t('unit.eth')}
              value={fee}
            />
          }
          isBalanceLoading={hasError || isCommonDataLoading}
          isDisabled={loading}
          labelTooltip={t('stake-ethereum.amount-tooltip', {
            step: ETH_STAKING_AMOUNT_STEP,
          })}
          loading={hasError || loading}
          minAmount={minAmount}
          renderStats={renderStats}
          stakingAmountStep={ETH_STAKING_AMOUNT_STEP}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />

        <StakeStats
          amount={amount ?? 0}
          apy={apy}
          metricsServiceName={EMetricsServiceName.ETH}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
