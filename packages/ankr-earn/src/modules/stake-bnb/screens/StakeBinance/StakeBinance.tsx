import { Box, ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { Faq, IFaqItem } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { BNB_STAKING_MAX_DECIMALS_LEN } from 'modules/stake-bnb/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import {
  IStakeStatsItem,
  StakeStats,
} from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';
import { useRedeemData } from '../../hooks/useRedeemData';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeBinanceStyles } from './useStakeBinanceStyles';

export const StakeBinance = (): JSX.Element => {
  const classes = useStakeBinanceStyles();
  const dispatchRequest = useDispatchRequest();
  const faqItems: IFaqItem[] = useFaq();
  const { redeemPeriod, redeemValue } = useRedeemData();

  const {
    isSuccessOpened,
    onAddTokenClick,
    onSuccessClose,
    onSuccessOpen,
    token,
  } = useSuccessDialog();

  const {
    amount,
    fetchAPYData,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    totalAmount,
    stakeGas,
    isStakeGasLoading,
    handleSubmit,
    handleFormChange,
  } = useStakeForm({ openSuccessModal: onSuccessOpen });

  const stakeStats: IStakeStatsItem[] = useStakeStats(fetchAPYData, amount);

  useProviderEffect((): void => {
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  if (isFetchStatsLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  const onRenderStats = (relayerFee: BigNumber) => (): JSX.Element => {
    return (
      <>
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
              symbol={t('unit.abnbb')}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />

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
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

  return (
    <section className={classes.root}>
      {fetchStatsError !== null && (
        <StakeContainer>
          <QueryError error={fetchStatsError} />
        </StakeContainer>
      )}

      {fetchStatsError === null &&
        fetchStatsData !== null &&
        (isSuccessOpened ? (
          <Container>
            <StakeSuccessDialog
              tokenName={token}
              onAddTokenClick={onAddTokenClick}
              onClose={onSuccessClose}
            />
          </Container>
        ) : (
          <StakeContainer>
            <StakeForm
              isMaxBtnShowed
              balance={fetchStatsData.bnbBalance}
              feeSlot={
                <StakeFeeInfo
                  isLoading={isStakeGasLoading}
                  value={t('unit.token-value', {
                    token: t('unit.bnb'),
                    value: stakeGas.toFormat(),
                  })}
                />
              }
              loading={isStakeLoading}
              maxAmount={fetchStatsData.bnbBalance}
              maxAmountDecimals={BNB_STAKING_MAX_DECIMALS_LEN}
              minAmount={fetchStatsData.minimumStake}
              renderStats={onRenderStats(fetchStatsData.relayerFee)}
              tokenIn={t('unit.bnb')}
              tokenOut={t('unit.abnbb')}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats stats={stakeStats} />

            <Faq data={faqItems} />
          </StakeContainer>
        ))}
    </section>
  );
};
