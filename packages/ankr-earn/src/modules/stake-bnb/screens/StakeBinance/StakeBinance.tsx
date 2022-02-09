import { ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { Faq } from 'modules/common/components/Faq';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { DECIMAL_PLACES } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { BNB_STAKING_AMOUNT_STEP } from 'modules/stake-bnb/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import React, { useCallback } from 'react';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';
import { fetchStats } from '../../actions/fetchStats';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeBinanceStyles } from './useStakeBinanceStyles';

export const StakeBinance = () => {
  const classes = useStakeBinanceStyles();
  const dispatchRequest = useDispatchRequest();
  const {
    token,
    onAddTokenClick,
    onSuccessOpen,
    onSuccessClose,
    isSuccessOpened,
  } = useSuccessDialog();

  const { amount, handleFormChange, handleSubmit, isStakeLoading } =
    useStakeForm({
      openSuccessModal: onSuccessOpen,
    });

  const stats = useStakeStats(+amount);
  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  const renderStats = useCallback(
    (amount: number) => {
      const isZeroAmount: boolean = amount === 0;

      return (
        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            {t(isZeroAmount ? 'unit.bnb-value' : 'unit.~abnbb', {
              value: new BigNumber(amount).decimalPlaces(DECIMAL_PLACES),
            })}
            <Tooltip
              title={
                <div>
                  <div>{t('stake-bnb.bnb-tooltip-title')}</div>
                  <br />
                  <div>{t('stake-bnb.bnb-tooltip-body')}</div>
                </div>
              }
            >
              <ButtonBase className={classes.questionBtn}>
                <QuestionIcon size="xs" />
              </ButtonBase>
            </Tooltip>
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      );
    },
    [classes],
  );

  return (
    <Queries<ResponseData<typeof fetchStats>> requestActions={[fetchStats]}>
      {({ data }) => (
        <section className={classes.root}>
          {isSuccessOpened ? (
            <Container>
              <StakeSuccessDialog
                tokenName={token}
                onClose={onSuccessClose}
                onAddTokenClick={onAddTokenClick}
              />
            </Container>
          ) : (
            <StakeContainer>
              <StakeForm
                balance={data.bnbBalance}
                maxAmount={data.bnbBalance.toNumber()}
                stakingAmountStep={BNB_STAKING_AMOUNT_STEP}
                minAmount={data.minimumStake.toNumber()}
                loading={isStakeLoading}
                tokenIn={t('unit.bnb')}
                tokenOut={t('unit.abnbb')}
                onSubmit={handleSubmit}
                renderStats={renderStats}
                onChange={handleFormChange}
              />

              <StakeStats stats={stats} />

              <Faq data={faqItems} />
            </StakeContainer>
          )}
        </section>
      )}
    </Queries>
  );
};
