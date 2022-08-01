import { Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useMemo } from 'react';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getAllClaimableUnstakes } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { BaseAnkrAmount } from 'modules/stake-ankr/components/BaseAnkrAmount';
import { Section } from 'modules/stake-ankr/components/Section';
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { CloseButton } from 'uiKit/CloseButton';
import { Container } from 'uiKit/Container';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { Spinner } from 'uiKit/Spinner';

import { useClaimRewards } from './useClaimRewards';
import { useClaimRewardsStyles } from './useClaimRewardsStyles';

export const ClaimRewards = (): JSX.Element => {
  const classes = useClaimRewardsStyles();
  const dispatchRequest = useDispatchRequest();

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

  useProviderEffect(() => {
    dispatchRequest(getAllClaimableUnstakes());
  }, [dispatchRequest]);

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

                  <BaseAnkrAmount ankrAmount={total} usdAmount={totalUSD} />
                </div>
              </div>

              <Button
                fullWidth
                className={classes.submit}
                disabled={claimLoading}
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
