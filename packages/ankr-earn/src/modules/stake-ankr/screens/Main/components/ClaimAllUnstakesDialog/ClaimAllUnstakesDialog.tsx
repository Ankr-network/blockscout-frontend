import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { uid } from 'react-uid';

import { t } from 'common';

import { IClaimableUnstake } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { BaseAnkrAmount } from 'modules/stake-ankr/components/BaseAnkrAmount';
import { TableRow } from 'modules/stake-ankr/components/TableRow';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { Dialog } from 'uiKit/Dialog';
import { Spinner } from 'uiKit/Spinner';

import { useClaimAllUnstakesDialogStyles } from './useClaimAllUnstakesDialogStyles';

interface IClaimAllUnstakesDialogProps {
  isClaimsLoading: boolean;
  loading: boolean;
  isFewClaims: boolean;
  isSingleClaim: boolean;
  data: IClaimableUnstake[];
  open: boolean;
  total: BigNumber;
  totalUSD: BigNumber;
  onClose?: () => void;
  onClaim: () => void;
}

export const ClaimAllUnstakesDialog = ({
  isClaimsLoading = false,
  isFewClaims,
  isSingleClaim,
  data,
  total,
  loading,
  totalUSD,
  open,
  onClose,
  onClaim,
}: IClaimAllUnstakesDialogProps): JSX.Element => {
  const classes = useClaimAllUnstakesDialogStyles();

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <Container data-testid="claim-all-unstakes-dialog" maxWidth="680px">
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
                    <BaseAnkrAmount ankrAmount={total} usdAmount={totalUSD} />
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
      </Container>
    </Dialog>
  );
};
