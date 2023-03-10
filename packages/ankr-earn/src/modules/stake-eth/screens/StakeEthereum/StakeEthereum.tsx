import { t } from '@ankr.com/common';
import { resetRequests } from '@redux-requests/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { AUDIT_LINKS, DUNE_ANALYTICS_LINK, ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { getFAQ } from 'modules/stake/actions/getFAQ';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTokenInfo } from 'modules/stake/components/StakeTokenInfo/StakeTokenInfo';

import { useBTokenNotice } from '../../../stake/hooks/useBTokenNotice';

import { EthTradeInfo } from './components/EthTradeInfo';
import { TotalAmount } from './components/TotalAmount';
import { Unclaimed } from './components/Unclaimed';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeEthereumStyles } from './useStakeEthereumStyles';

export const StakeEthereum = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStakeEthereumStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();
  const { refetch: getETHCommonDataRefetch } = useGetETHCommonDataQuery();
  const { refetch: getETHClaimableDataRefetch } = useGetETHClaimableDataQuery();
  const {
    amount,
    balance,
    certificateRatio,
    faqItems,
    fee,
    isCommonDataLoading,
    isFeeLoading,
    isInvalidAmount,
    loading,
    tokenIn,
    tokenOut,
    onInputChange,
    onSubmit,
  } = useStakeForm();

  useProviderEffect(() => {
    getETHCommonDataRefetch();
    getETHClaimableDataRefetch();
    dispatch(getFAQ(Token.ETH));
    dispatch(getMetrics());

    return () => {
      dispatch(resetRequests([getFAQ.toString()]));
    };
  }, [dispatch]);

  const renderStats = useCallback(
    () => (
      <>
        <StakeTokenInfo
          nativeAmount={ONE.dividedBy(certificateRatio)}
          nativeToken={Token.ETH}
          token={t('unit.aethc')}
        />

        <Unclaimed />

        <TotalAmount
          amount={amount}
          fee={fee}
          isFeeLoading={isFeeLoading}
          isInvalidAmount={isInvalidAmount}
        />
      </>
    ),
    [amount, certificateRatio, fee, isFeeLoading, isInvalidAmount],
  );

  const noticeText = useBTokenNotice({
    bToken: Token.aETHb,
    cToken: getTokenSymbol(Token.aETHc),
    nativeToken: Token.ETH,
  });

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        <EthTradeInfo />

        <StakeForm
          auditSlot={
            <AuditInfo mt={4}>
              <AuditInfoItem link={AUDIT_LINKS.eth} variant="beosin" />
            </AuditInfo>
          }
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
          loading={hasError || loading}
          noticeSlot={noticeText}
          renderStats={renderStats}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />

        <StakeStats
          amount={amount ?? 0}
          analyticsLink={DUNE_ANALYTICS_LINK.eth}
          metricsServiceName={EMetricsServiceName.ETH}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
