import { ButtonBase } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';

import { BNB_STAKING_MAX_DECIMALS_LEN } from '@ankr.com/staking-sdk';
import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq, IFaqItem } from 'modules/common/components/Faq';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  DEFAULT_FIXED,
  featuresConfig,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchPendingValues } from 'modules/stake-bnb/actions/fetchPendingValues';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getStakeTradeInfoData } from 'modules/stake/actions/getStakeTradeInfoData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { EOpenOceanNetworks, EOpenOceanTokens } from 'modules/stake/types';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchStats } from '../../actions/fetchStats';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeBinanceStyles } from './useStakeBinanceStyles';

export const StakeBinance = (): JSX.Element => {
  const classes = useStakeBinanceStyles();
  const dispatch = useDispatch();
  const faqItems: IFaqItem[] = useFaq();
  const { onErroMessageClick, hasError } = useErrorMessage();

  const {
    aBNBcRatio,
    amount,
    bnbBalance,
    certificateRatio,
    isFetchStatsLoading,
    isStakeGasLoading,
    isStakeLoading,
    minimumStake,
    relayerFee,
    stakeGas,
    tokenIn,
    tokenOut,
    totalAmount,
    handleFormChange,
    handleSubmit,
    onTokenSelect,
  } = useStakeForm();

  const onRenderStats = (): JSX.Element => {
    return (
      <>
        <TokenVariantList my={5}>
          <TokenVariant
            description={tHTML('stake-bnb.abnbb-descr')}
            iconSlot={<ABNBBIcon />}
            isActive={tokenOut === Token.aBNBb}
            isDisabled={isStakeLoading}
            title={t('unit.abnbb')}
            onClick={onTokenSelect(Token.aBNBb)}
          />

          <TokenVariant
            description={tHTML('stake-bnb.abnbc-descr', {
              rate: isFetchStatsLoading
                ? '...'
                : aBNBcRatio.decimalPlaces(DEFAULT_FIXED).toFormat(),
            })}
            iconSlot={<ABNBCIcon />}
            isActive={tokenOut === Token.aBNBc}
            isDisabled={isStakeLoading}
            title={t('unit.abnbc')}
            onClick={onTokenSelect(Token.aBNBc)}
          />
        </TokenVariantList>

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            <span>{t('stake-bnb.relayer-fee')}</span>

            <Tooltip title={t('stake-bnb.tooltips.relayer-fee')}>
              <ButtonBase className={classes.questionBtn}>
                <QuestionIcon size="xs" />
              </ButtonBase>
            </Tooltip>
          </StakeDescriptionName>

          <StakeDescriptionValue isBold={false}>
            {t('unit.bnb-value', {
              value: relayerFee,
            })}
          </StakeDescriptionValue>
        </StakeDescriptionContainer>

        <StakeDescriptionSeparator />

        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              isLoading={isStakeGasLoading}
              symbol={tokenOut}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

  useProviderEffect(() => {
    dispatch(getMetrics());
    dispatch(fetchStats());
    dispatch(fetchPendingValues());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatch]);

  useProviderEffect(() => {
    if (!featuresConfig.isActiveStakeTradeInfo) {
      return;
    }

    dispatch(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.BNB,
        bondToken: EOpenOceanTokens.aBNBb,
        certificateRatio,
        certificateToken: EOpenOceanTokens.aBNBc,
        network: EOpenOceanNetworks.BSC,
      }),
    );
  }, [certificateRatio, dispatch]);

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        {featuresConfig.isActiveStakeTradeInfo && <StakeTradeInfo />}

        <StakeForm
          auditSlot={
            <AuditInfo>
              <AuditInfoItem link={AUDIT_LINKS.bnbBeosin} variant="beosin" />

              <AuditInfoItem
                link={AUDIT_LINKS.bnbPeckShield}
                variant="peckshield"
              />
            </AuditInfo>
          }
          balance={bnbBalance}
          feeSlot={
            <StakeFeeInfo
              isLoading={isStakeGasLoading}
              token={t('unit.bnb')}
              value={stakeGas}
            />
          }
          isBalanceLoading={hasError || isFetchStatsLoading}
          isDisabled={isStakeLoading || isFetchStatsLoading}
          loading={hasError || isStakeLoading || isFetchStatsLoading}
          maxAmount={bnbBalance}
          maxAmountDecimals={BNB_STAKING_MAX_DECIMALS_LEN}
          minAmount={minimumStake}
          renderStats={onRenderStats}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        />

        <StakeStats
          amount={amount}
          metricsServiceName={EMetricsServiceName.BNB}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
