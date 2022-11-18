import { t, tHTML } from '@ankr.com/common';
import { Paper, Typography } from '@material-ui/core';
import { useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { Section } from 'modules/delegate-stake/components/Section';
import { useLazyGetAllClaimableUnstakesQuery } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { CloseButton } from 'uiKit/CloseButton';
import { Container } from 'uiKit/Container';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { Spinner } from 'uiKit/Spinner';

import { useClaimRewards } from './hooks/useClaimRewards';
import { useClaimRewardsStyles } from './useClaimRewardsStyles';

export const ClaimRewards = (): JSX.Element => {
  const classes = useClaimRewardsStyles();

  const {
    loading,
    amount,
    unstakes,
    usdTokenPrice,
    tokenIn,
    closeHref,
    isClaimUnstakes,
    epochEnds,
    claimLoading,
    onClaimRewardsClick,
    onSubmit,
  } = useClaimRewards();

  const [getAllClaimableUnstakes] = useLazyGetAllClaimableUnstakesQuery();

  useProviderEffect(() => {
    getAllClaimableUnstakes();
  }, []);

  const total = useMemo(
    () => (isClaimUnstakes ? amount.plus(unstakes) : amount),
    [amount, unstakes, isClaimUnstakes],
  );

  const totalUSD = usdTokenPrice ? total.multipliedBy(usdTokenPrice) : ZERO;

  return (
    <Section withContainer={false}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          <CloseButton href={closeHref} />

          <Typography className={classes.header} variant="h3">
            {t('stake-ankr.claim-dialog.reward-header')}
          </Typography>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className={classes.table}>
                <div className={classes.row}>
                  <Typography className={classes.rowName}>
                    {t('stake-ankr.claim-dialog.amount')}

                    <QuestionWithTooltip>
                      {tHTML('stake-ankr.restake.restakable-tooltip', {
                        value: epochEnds,
                      })}
                    </QuestionWithTooltip>
                  </Typography>

                  <Typography className={classes.rowValue}>
                    {t('unit.ankr-value', {
                      value: amount.toFormat(),
                      token: tokenIn,
                    })}
                  </Typography>
                </div>

                {!!unstakes && !unstakes?.isZero() && (
                  <div className={classes.row}>
                    <Checkbox
                      checked={isClaimUnstakes}
                      label={t(
                        'stake-ankr.claim-dialog.claim-undelegated-stake',
                        { value: unstakes.toFormat() },
                      )}
                      onChange={onClaimRewardsClick}
                    />
                  </div>
                )}

                <div className={classes.row}>
                  <Typography className={classes.rowName}>
                    {t('stake-ankr.claim-dialog.total')}
                  </Typography>

                  <div className={classes.baseAmountAlign}>
                    <BaseTokenUsdAmount
                      amount={total}
                      token={Token.ANKR}
                      usdAmount={totalUSD}
                    />
                  </div>
                </div>
              </div>

              <Button
                fullWidth
                className={classes.submit}
                disabled={claimLoading || amount.isZero()}
                isLoading={claimLoading}
                size="large"
                onClick={onSubmit}
              >
                {t('stake-ankr.claim-dialog.claim')}
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Section>
  );
};
