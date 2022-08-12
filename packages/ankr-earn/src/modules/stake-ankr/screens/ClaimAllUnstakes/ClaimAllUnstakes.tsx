import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { uid } from 'react-uid';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { BaseTokenUsdAmount } from 'modules/delegate-stake/components/BaseTokenUsdAmount';
import { Section } from 'modules/delegate-stake/components/Section';
import { TableRow } from 'modules/stake-ankr/components/TableRow';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { Container } from 'uiKit/Container';
import { Spinner } from 'uiKit/Spinner';

import { useClaimAllUnstakes } from './useClaimAllUnstakes';
import { useClaimAllUnstakesStyles } from './useClaimAllUnstakesStyles';

export const ClaimAllUnstakes = (): JSX.Element => {
  const classes = useClaimAllUnstakesStyles();

  const {
    isFewClaims,
    isSingleClaim,
    data,
    isClaimsLoading,
    loading,
    total,
    totalUSD,
    closeHref,
    onClaim,
  } = useClaimAllUnstakes();

  return (
    <Section withContainer={false}>
      <Container data-testid="claim-all-unstakes-dialog" maxWidth="680px">
        <Paper className={classes.root} component="div" variant="elevation">
          <CloseButton href={closeHref} />

          <Typography className={classes.header} variant="h3">
            {t('stake-ankr.claim-dialog.stake-header')}
          </Typography>

          {isClaimsLoading || loading ? (
            <Spinner />
          ) : (
            <>
              {isSingleClaim && (
                <div className={classes.singleWrapper}>
                  {getDemoProviderName(data[0].validator)}

                  <div>
                    {t('unit.ankr-value', {
                      value: data[0].amount.toFormat(),
                    })}
                  </div>
                </div>
              )}

              {isFewClaims && (
                <table className={classes.table}>
                  {data.map(claim => (
                    <TableRow
                      key={uid(claim)}
                      provider={
                        getDemoProviderName(claim.validator) ?? claim.validator
                      }
                      value={claim.amount}
                    />
                  ))}

                  <tr className={classes.totalTr}>
                    <td
                      className={classNames(
                        classes.td,
                        classes.left,
                        classes.total,
                      )}
                    >
                      {t('stake-ankr.claim-dialog.total')}
                    </td>

                    <td
                      className={classNames(
                        classes.td,
                        classes.right,
                        classes.flexRight,
                      )}
                    >
                      <BaseTokenUsdAmount
                        amount={total}
                        token={Token.ANKR}
                        usdAmount={totalUSD}
                      />
                    </td>
                  </tr>
                </table>
              )}

              <Button
                fullWidth
                className={classes.submit}
                disabled={isClaimsLoading || loading}
                isLoading={loading}
                size="large"
                onClick={onClaim}
              >
                {t('stake-ankr.claim-dialog.claim-all')}
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Section>
  );
};
