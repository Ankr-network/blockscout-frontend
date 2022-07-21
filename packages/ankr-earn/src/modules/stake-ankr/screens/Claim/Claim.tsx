import { Container, Paper, Typography } from '@material-ui/core';

import { t } from 'common';

import { InfoHeader } from 'modules/stake-ankr/components/InfoHeader';
import { Section } from 'modules/stake-ankr/components/Section';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useClaim } from './hooks/useClaim';
import { useClaimStyles } from './useClaimStyles';

export const Claim = (): JSX.Element => {
  const classes = useClaimStyles();

  const {
    claimable,
    loading,
    tokenIn,
    closeHref,
    providerName,
    rewards,
    epochEnd,
    onSubmit,
  } = useClaim();

  return (
    <Section withContainer={false}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          <CloseButton href={closeHref} />

          <Typography className={classes.title} variant="h2">
            {t('stake-ankr.claim.title')}
          </Typography>

          <InfoHeader allRewards={rewards} epochEnd={epochEnd} />

          <div className={classes.table}>
            <div className={classes.row}>
              <Typography className={classes.rowName}>
                {t('stake-ankr.claim.claimable-amount')}

                <QuestionWithTooltip>
                  {t('stake-ankr.claim.claimable-tooltip')}
                </QuestionWithTooltip>
              </Typography>

              <Typography className={classes.rowValue}>
                {t('unit.ankr-value', {
                  value: claimable.toFormat(),
                  token: tokenIn,
                })}
              </Typography>
            </div>

            <div className={classes.row}>
              <Typography className={classes.rowName}>
                {t('stake-ankr.claim.node-provider')}
              </Typography>

              <Typography className={classes.rowValue}>
                {providerName}
              </Typography>
            </div>
          </div>

          <Button
            fullWidth
            className={classes.stakeBtn}
            color="primary"
            disabled={loading}
            isLoading={loading}
            size="large"
            type="submit"
            onClick={onSubmit}
          >
            {t('stake-ankr.claim.submit')}
          </Button>
        </Paper>
      </Container>
    </Section>
  );
};
