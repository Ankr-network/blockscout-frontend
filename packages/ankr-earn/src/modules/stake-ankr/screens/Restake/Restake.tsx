import { t, tHTML } from '@ankr.com/common';
import { Container, Paper, Typography } from '@material-ui/core';

import { Section } from 'modules/delegate-stake/components/Section';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { Quote } from 'uiKit/Quote';

import { useRestake } from './hooks/useRestake';
import { useRestakeStyles } from './useRestakeStyles';

export const Restake = (): JSX.Element => {
  const classes = useRestakeStyles();
  const {
    restakable,
    loading,
    tokenIn,
    closeHref,
    providerName,
    newTotalStake,
    epochEnds,
    lockingPeriod,
    onSubmit,
  } = useRestake();

  return (
    <Section withContainer={false}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          <CloseButton href={closeHref} />

          <Typography className={classes.title} variant="h2">
            {t('stake-ankr.restake.title')}
          </Typography>

          <div className={classes.table}>
            <div className={classes.row}>
              <Typography className={classes.rowName}>
                {t('stake-ankr.restake.restakable-amount')}

                <QuestionWithTooltip>
                  {tHTML('stake-ankr.restake.restakable-tooltip', {
                    value: epochEnds,
                  })}
                </QuestionWithTooltip>
              </Typography>

              <Typography className={classes.rowValue}>
                {t('unit.ankr-value', {
                  value: restakable.toFormat(),
                  token: tokenIn,
                })}
              </Typography>
            </div>

            <div className={classes.row}>
              <Typography className={classes.rowName}>
                {t('stake-ankr.restake.node-provider')}
              </Typography>

              <Typography className={classes.rowValue}>
                {providerName}
              </Typography>
            </div>

            <div className={classes.row}>
              <Typography className={classes.rowName}>
                {t('stake-ankr.restake.new-total-stake')}
              </Typography>

              <Typography className={classes.rowValue}>
                {newTotalStake?.toFormat()}
              </Typography>
            </div>
          </div>

          <Quote mb={5} pt={1}>
            {t('stake-ankr.restake.locking-info', {
              value: lockingPeriod,
            })}
          </Quote>

          <Button
            fullWidth
            className={classes.stakeBtn}
            color="primary"
            disabled={loading || restakable.isZero()}
            isLoading={loading}
            size="large"
            type="submit"
            onClick={onSubmit}
          >
            {t('stake-ankr.restake.submit')}
          </Button>
        </Paper>
      </Container>
    </Section>
  );
};
