import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { IStakingReward } from 'modules/stake-ankr/api/AnkrStakingSDK/types';
import { BaseAnkrAmount } from 'modules/stake-ankr/components/BaseAnkrAmount';
import { TableRow } from 'modules/stake-ankr/components/TableRow';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { Dialog } from 'uiKit/Dialog';
import { Spinner } from 'uiKit/Spinner';

import { useClaimAllRewardsDialogStyles } from './useClaimAllRewardsDialogStyles';

interface IClaimRewardsDialogProps {
  availableClaims?: IStakingReward[];
  isClaimsLoading?: boolean;
  open: boolean;
  usdTokenPrice?: BigNumberish;
  claimLoading?: boolean;
  onClaim?: () => void;
  onClose?: () => void;
}

export const ClaimAllRewardsDialog = ({
  availableClaims = [],
  isClaimsLoading = false,
  claimLoading = false,
  usdTokenPrice = 0,
  open,
  onClaim,
  onClose,
}: IClaimRewardsDialogProps): JSX.Element => {
  const classes = useClaimAllRewardsDialogStyles();

  const isFewClaims = availableClaims.length > 1;
  const isSingleClaim = availableClaims.length === 1;

  const total = useMemo(
    () =>
      availableClaims.reduce((acc, claim) => {
        return acc.plus(claim.amount);
      }, ZERO),
    [availableClaims],
  );

  const totalUSD = total.multipliedBy(usdTokenPrice);

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <Container data-testid="claim-all-rewards-dialog" maxWidth="680px">
        <Typography className={classes.header} variant="h3">
          {t('stake-ankr.claim-dialog.all-reward-header')}
        </Typography>

        {isClaimsLoading ? (
          <Spinner />
        ) : (
          <>
            {isSingleClaim && (
              <div className={classes.singleWrapper}>
                {getDemoProviderName(availableClaims[0].validator.validator)}

                <div>
                  {t('unit.ankr-value', {
                    value: availableClaims[0].amount.toFormat(),
                  })}
                </div>
              </div>
            )}

            {isFewClaims && (
              <table className={classes.table}>
                {availableClaims.map(claim => (
                  <TableRow
                    key={uid(claim)}
                    provider={
                      getDemoProviderName(claim.validator.validator) ??
                      claim.validator.validator
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
              disabled={isClaimsLoading || claimLoading}
              isLoading={claimLoading}
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
