import { Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useMemo } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { Section } from 'modules/delegate-stake/components/Section';
import { getAllClaimableUnstakes } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { CloseButton } from 'uiKit/CloseButton';
import { Container } from 'uiKit/Container';
import { Spinner } from 'uiKit/Spinner';

import { useClaimUnstakes } from './hooks/useClaimUnstakes';
import { useClaimUnstakesStyles } from './useClaimUnstakesStyles';

export const ClaimUnstakes = (): JSX.Element => {
  const classes = useClaimUnstakesStyles();
  const dispatchRequest = useDispatchRequest();

  const {
    loading,
    amount,
    rewards,
    usdTokenPrice,
    closeHref,
    isClaimRewards,
    claimLoading,
    onClaimRewardsClick,
    onSubmit,
  } = useClaimUnstakes();

  useProviderEffect(() => {
    dispatchRequest(getAllClaimableUnstakes());
  }, [dispatchRequest]);

  const total = useMemo(
    () => (isClaimRewards ? amount.plus(rewards) : amount),
    [amount, rewards, isClaimRewards],
  );

  const totalUSD = usdTokenPrice ? total.multipliedBy(usdTokenPrice) : ZERO;

  return (
    <Section withContainer={false}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          <CloseButton href={closeHref} />

          <Typography className={classes.header} variant="h3">
            {t('stake-ankr.claim-dialog.stake-header')}
          </Typography>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className={classes.table}>
                <div className={classes.row}>
                  <Typography className={classes.rowName}>
                    {t('stake-ankr.claim-dialog.amount')}
                  </Typography>

                  <Typography className={classes.rowValue}>
                    {t('unit.ankr-value', {
                      value: amount.toFormat(),
                      token: Token.ANKR,
                    })}
                  </Typography>
                </div>

                {!!rewards && !rewards?.isZero() && (
                  <div className={classes.row}>
                    <Checkbox
                      checked={isClaimRewards}
                      label={t('stake-ankr.claim-dialog.claim-rewards', {
                        value: rewards.toFormat(),
                      })}
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
