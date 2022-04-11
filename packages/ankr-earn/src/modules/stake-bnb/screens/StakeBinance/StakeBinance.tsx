import { ButtonBase } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq, IFaqItem } from 'modules/common/components/Faq';
import {
  DECIMAL_PLACES,
  DEFAULT_FIXED,
  featuresConfig,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { getStakeGasFee } from 'modules/stake-bnb/actions/getStakeGasFee';
import { BNB_STAKING_MAX_DECIMALS_LEN } from 'modules/stake-bnb/const';
import { useRedeemData } from 'modules/stake-bnb/hooks/useRedeemData';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useStakeBinanceStyles } from './useStakeBinanceStyles';

export const StakeBinance = (): JSX.Element => {
  const classes = useStakeBinanceStyles();
  const dispatch = useDispatch();
  const faqItems: IFaqItem[] = useFaq();
  const { onErroMessageClick, hasError } = useErrorMessage();
  const { redeemPeriod, redeemValue } = useRedeemData();

  const {
    amount,
    fetchAPYData,
    relayerFee,
    bnbBalance,
    minimumStake,
    isFetchStatsLoading,
    isStakeLoading,
    totalAmount,
    stakeGas,
    isStakeGasLoading,
    tokenIn,
    tokenOut,
    aBNBcRatio,
    handleSubmit,
    handleFormChange,
    onTokenSelect,
  } = useStakeForm();

  const stakeStats = useStakeStats({
    apy: fetchAPYData,
    amount,
  });

  useProviderEffect(() => {
    dispatch(fetchValidatorsDetails());
    dispatch(fetchAPY());
    dispatch(fetchStats());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatch]);

  const onRenderStats = (): JSX.Element => {
    return (
      <>
        {featuresConfig.stakeAbnbc && (
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
        )}

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

            {!featuresConfig.stakeAbnbc && (
              <Tooltip
                title={tHTML('stake-bnb.tooltips.you-will-get', {
                  value: redeemValue,
                  period: redeemPeriod,
                })}
              >
                <ButtonBase className={classes.questionBtn}>
                  <QuestionIcon size="xs" />
                </ButtonBase>
              </Tooltip>
            )}
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        <StakeForm
          isMaxBtnShowed
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

        <StakeStats stats={stakeStats} />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
