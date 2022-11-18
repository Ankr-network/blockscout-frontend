import { t, tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES, DEFAULT_ROUNDING } from 'modules/common/const';
import { NetworkTitle } from 'modules/stake-matic/common/components/NetworkTitle';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { Container } from 'uiKit/Container';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useUnstake } from './hooks/useUnstake';
import { useUnstakeStyles } from './useUnstakeStyles';

export const Unstake = (): JSX.Element => {
  const classes = useUnstakeStyles();

  const {
    closeHref,
    extraValidation,
    getTotalVal,
    isApproveLoading,
    isApproved,
    isGetStatsLoading,
    isUnstakeLoading,
    isWithApprove,
    maticPoolLiquidityInAC,
    selectedToken,
    syntTokenBalance,
    tokenOut,
    unstakeFeePct,
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
              value: maticPoolLiquidityInAC
                .decimalPlaces(DEFAULT_ROUNDING)
                .toFormat(),
              token: t('unit.amaticc'),
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
        <UnstakeDialog
          balance={syntTokenBalance}
          closeHref={closeHref}
          extraValidation={extraValidation}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isGetStatsLoading}
          isDisabled={isApproveLoading || isUnstakeLoading}
          isLoading={isUnstakeLoading}
          isWithApprove={isWithApprove}
          networkTitleSlot={<NetworkTitle />}
          renderFormFooter={renderFormFooter}
          token={selectedToken}
          onSubmit={onUnstakeSubmit}
        />
      </Container>
    </section>
  );
};
