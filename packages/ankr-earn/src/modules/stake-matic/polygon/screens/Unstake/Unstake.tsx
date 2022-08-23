import BigNumber from 'bignumber.js';

import { t, tHTML } from 'common';

import { DECIMAL_PLACES, DEFAULT_ROUNDING } from 'modules/common/const';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { Container } from 'uiKit/Container';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useUnstake } from './hooks/useUnstake';
import { useUnstakeStyles } from './useUnstakeStyles';

export const Unstake = (): JSX.Element => {
  const classes = useUnstakeStyles();

  const {
    acPoolLiquidityInMATIC,
    closeHref,
    extraValidation,
    getTotalVal,
    isApproveLoading,
    isApproved,
    isGetStatsLoading,
    isSuccessOpened,
    isUnstakeLoading,
    isWithApprove,
    selectedToken,
    syntTokenBalance,
    tokenOut,
    unstakeFeePct,
    onSuccessClose,
    onUnstakeSubmit,
  } = useUnstake();

  const renderFormFooter = (
    amount: BigNumber,
    maxAmount: BigNumber,
  ): JSX.Element => {
    const totalVal = getTotalVal(maxAmount, amount);

    return (
      <>
        <div className={classes.liquidityPoolArea}>
          <div>
            {tHTML('stake-matic-polygon.liquidity-pool-label', {
              value: acPoolLiquidityInMATIC
                .decimalPlaces(DEFAULT_ROUNDING)
                .toFormat(),
            })}
          </div>

          <QuestionWithTooltip className={classes.questionBtn}>
            {t('stake-matic-polygon.tooltips.unstake-liquidity-pool')}
          </QuestionWithTooltip>
        </div>

        {unstakeFeePct && (
          <>
            <StakeDescriptionContainer>
              <StakeDescriptionName>
                <span>{t('unstake-dialog.unstake-fee')}</span>
              </StakeDescriptionName>

              <StakeDescriptionValue isBold={false}>
                {t('unit.percentage-value', {
                  value: unstakeFeePct.decimalPlaces(DECIMAL_PLACES).toFormat(),
                })}
              </StakeDescriptionValue>
            </StakeDescriptionContainer>

            <StakeDescriptionSeparator />
          </>
        )}

        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={tokenOut}
              value={totalVal.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

  return (
    <section className={classes.root}>
      <Container>
        {!isSuccessOpened ? (
          <UnstakeDialog
            balance={syntTokenBalance}
            closeHref={closeHref}
            extraValidation={extraValidation}
            isApproved={isApproved}
            isApproveLoading={isApproveLoading}
            isBalanceLoading={isGetStatsLoading}
            isLoading={isUnstakeLoading}
            isWithApprove={isWithApprove}
            renderFormFooter={renderFormFooter}
            submitDisabled={isUnstakeLoading}
            token={selectedToken}
            onSubmit={onUnstakeSubmit}
          />
        ) : (
          <UnstakeSuccess
            infoText=""
            title={t('stake-matic-polygon.unstake.success-title')}
            tokenName={tokenOut}
            onClose={onSuccessClose}
          />
        )}
      </Container>
    </section>
  );
};
