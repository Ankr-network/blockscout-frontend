import { t } from '@ankr.com/common';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { Faq } from 'modules/common/components/Faq';
import { AUDIT_LINKS, DUNE_ANALYTICS_LINK } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { NetworkTitle } from 'modules/stake-matic/common/components/NetworkTitle';
import { getFAQ } from 'modules/stake/actions/getFAQ';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { ApprovalFormButtons } from 'modules/stake/components/ApprovalFormButtons/ApprovalFormButtons';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTokenInfo } from 'modules/stake/components/StakeTokenInfo/StakeTokenInfo';
import { useBTokenNotice } from 'modules/stake/hooks/useBTokenNotice';
import { useAppDispatch } from 'store/useAppDispatch';

import { EthMaticTradeInfo } from './components/EthMaticTradeInfo';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakePolygonApprovalForm } from './hooks/useStakePolygonApprovalForm';
import { useStakePolygonStyles } from './useStakePolygonStyles';

const resetRequests = () =>
  resetReduxRequests([getFAQ.toString(), getMetrics.toString()]);

export const StakePolygon = (): JSX.Element => {
  const classes = useStakePolygonStyles();

  const dispatch = useAppDispatch();

  const {
    syntheticTokenPrice,
    amount,
    faqItems,
    gasFee,
    isShowGasFee,
    isStakeLoading,
    tokenIn,
    tokenOut,
    totalAmount,
    minimumStake,
    maticBalance,
    handleFormChange,
    handleSubmit,
  } = useStakeForm();

  const {
    isApproveLoading,
    allowance,
    onApproveSubmit,
    approvalSettingsMode,
    onApprovalSettingsFormSubmit,
  } = useStakePolygonApprovalForm();

  const tokenName = getTokenName(tokenOut);

  const renderStats = () => {
    return (
      <>
        <StakeTokenInfo
          nativeAmount={syntheticTokenPrice}
          nativeToken={Token.MATIC}
          token={t('unit.amaticc')}
        />

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.you-will-receive')}
          </StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={getTokenName(tokenOut)}
              value={totalAmount}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

  const renderFooter = (): JSX.Element => (
    <ApprovalFormButtons
      allowance={allowance}
      amount={amount}
      approvalSettingsMode={approvalSettingsMode}
      isApproveLoading={isApproveLoading}
      isStakeLoading={isStakeLoading}
      minAmount={minimumStake}
      tokenName={tokenName}
      onApprovalSettingsFormSubmit={onApprovalSettingsFormSubmit}
      onApproveSubmit={onApproveSubmit}
    />
  );

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(getFAQ(Token.MATIC));
    dispatch(getMetrics());

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  const noticeText = useBTokenNotice({
    bToken: Token.aMATICb,
    cToken: getTokenSymbol(Token.aMATICc),
    nativeToken: Token.MATIC,
  });

  return (
    <section className={classes.root}>
      <StakeContainer>
        <EthMaticTradeInfo />

        <StakeForm
          auditSlot={
            <AuditInfo>
              <AuditInfoItem link={AUDIT_LINKS.matic} variant="beosin" />
            </AuditInfo>
          }
          balance={maticBalance}
          feeSlot={
            isShowGasFee && (
              <StakeFeeInfo mt={-1.5} token={Token.ETH} value={gasFee} />
            )
          }
          isDisabled={isApproveLoading}
          loading={isStakeLoading}
          maxAmount={maticBalance}
          minAmount={minimumStake}
          networkTitleSlot={<NetworkTitle />}
          noticeSlot={noticeText}
          renderFooter={renderFooter}
          renderStats={renderStats}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        />

        <StakeStats
          amount={amount}
          analyticsLink={DUNE_ANALYTICS_LINK.matic}
          metricsServiceName={EMetricsServiceName.MATIC}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
