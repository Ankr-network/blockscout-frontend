import { t, tHTML } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES } from 'modules/common/const';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { Container } from 'uiKit/Container';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useUnstake } from './hooks/useUnstake';
import { useUnstakeStyles } from './hooks/useUnstakeStyles';

export const Unstake = (): JSX.Element => {
  const classes = useUnstakeStyles();

  const {
    closeHref,
    getTotalVal,
    infoLabel,
    isUnstakeDataLoading,
    isUnstakeLoading,
    poolAmount,
    syntToken,
    syntTokenBalance,
    tokenOut,
    onChange,
    onSubmit,
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
            {tHTML('stake-xdc.unstake.liquidity-pool.info', {
              value: poolAmount.decimalPlaces(DECIMAL_PLACES).toFormat(),
            })}
          </div>

          <QuestionWithTooltip className={classes.liquidityPoolTooltip}>
            {t('stake-xdc.unstake.liquidity-pool.tooltip')}
          </QuestionWithTooltip>
        </div>

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.you-will-receive')}
          </StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={tokenOut}
              value={totalVal.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>

        {infoLabel && (
          <>
            <StakeDescriptionSeparator />

            <div className={classes.unstakePeriodInfoArea}>{infoLabel}</div>
          </>
        )}
      </>
    );
  };

  return (
    <section>
      <Container>
        <UnstakeDialog
          balance={syntTokenBalance}
          closeHref={closeHref}
          isBalanceLoading={isUnstakeDataLoading}
          isDisabled={isUnstakeLoading}
          isLoading={isUnstakeLoading}
          renderFormFooter={renderFormFooter}
          token={syntToken}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Container>
    </section>
  );
};
