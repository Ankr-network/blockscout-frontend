import { t } from '@ankr.com/common';

import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { Faq } from 'modules/common/components/Faq';
import { AUDIT_LINKS, DUNE_ANALYTICS_LINK, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTokenInfo } from 'modules/stake/components/StakeTokenInfo/StakeTokenInfo';
import { useFaq } from 'modules/stake/hooks/useFaq';
import { QueryError } from 'uiKit/QueryError';

import { useBTokenNotice } from '../../../stake/hooks/useBTokenNotice';

import { AvaxTradeInfo } from './components/AvaxTradeInfo';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeAvalancheStyles } from './useStakeAvalancheStyles';

const AVAX_STAKING_AMOUNT_STEP = 1;

export const StakeAvalanche = (): JSX.Element => {
  const classes = useStakeAvalancheStyles();

  const { faqItems } = useFaq(Token.AVAX);

  const {
    syntheticTokenPrice,
    amount,
    balance,
    fetchStatsError,
    isGetCommonDataLoading,
    isStakeGasLoading,
    isStakeLoading,
    stakeGasFee,
    tokenOut,
    totalAmount,
    handleFormChange,
    handleSubmit,
  } = useStakeForm();

  const onRenderStats = (): JSX.Element => (
    <>
      <StakeTokenInfo
        nativeAmount={syntheticTokenPrice}
        nativeToken={Token.AVAX}
        token={t('unit.aavaxc')}
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

  const noticeText = useBTokenNotice({
    bToken: Token.aAVAXb,
    cToken: getTokenSymbol(Token.aAVAXc),
    nativeToken: Token.AVAX,
  });

  return (
    <section className={classes.root}>
      {fetchStatsError !== undefined && (
        <StakeContainer>
          <QueryError error={fetchStatsError} />
        </StakeContainer>
      )}

      {fetchStatsError === undefined && (
        <StakeContainer>
          <AvaxTradeInfo />

          <StakeForm
            isIntegerOnly
            auditSlot={
              <AuditInfo>
                <AuditInfoItem link={AUDIT_LINKS.avax} variant="beosin" />
              </AuditInfo>
            }
            balance={balance}
            feeSlot={
              <StakeFeeInfo
                isLoading={isStakeGasLoading}
                token={t('unit.avax')}
                value={stakeGasFee}
              />
            }
            isBalanceLoading={isGetCommonDataLoading}
            isDisabled={isStakeLoading}
            loading={isStakeLoading || isGetCommonDataLoading}
            maxAmount={balance}
            minAmount={ZERO}
            noticeSlot={noticeText}
            renderStats={onRenderStats}
            stakingAmountStep={AVAX_STAKING_AMOUNT_STEP}
            tokenIn={t('unit.avax')}
            tokenOut={tokenOut}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />

          <StakeStats
            amount={amount}
            analyticsLink={DUNE_ANALYTICS_LINK.avax}
            metricsServiceName={EMetricsServiceName.AVAX}
          />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
