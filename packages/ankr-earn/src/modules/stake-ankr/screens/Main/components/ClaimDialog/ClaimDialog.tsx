import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { BigNumberish } from 'modules/common/utils/numbers/converters';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { Dialog } from 'uiKit/Dialog';
import { Spinner } from 'uiKit/Spinner';

import { BaseAnkrAmount } from '../BaseAnkrAmount';

import { TableRow } from './TableRow';
import { useClaimDialogStyles } from './useClaimDialogStyles';

export interface IAvailableClaimItem {
  provider: string;
  value: BigNumber;
}

interface IClaimDialogProps {
  availableClaims?: IAvailableClaimItem[];
  isClaimLoading?: boolean;
  open: boolean;
  usdTokenPrice?: BigNumberish;
  onClaim?: () => void;
  onClose?: () => void;
}

export const ClaimDialog = ({
  availableClaims = [],
  isClaimLoading = false,
  usdTokenPrice = 0,
  open,
  onClaim,
  onClose,
}: IClaimDialogProps): JSX.Element => {
  const classes = useClaimDialogStyles();

  const isFewClaims = availableClaims.length > 1;
  const isSingleClaim = availableClaims.length === 1;

  const total = useMemo(
    () =>
      availableClaims.reduce((acc, claim) => {
        return acc.plus(claim.value);
      }, ZERO),
    [availableClaims],
  );

  const totalUSD = total.multipliedBy(usdTokenPrice);

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <Container data-testid="claim-dialog" maxWidth="680px">
        <Typography className={classes.header} variant="h3">
          {t('stake-ankr.claim-dialog.header')}
        </Typography>

        {isClaimLoading ? (
          <Spinner />
        ) : (
          <>
            {isSingleClaim && (
              <div className={classes.singleWrapper}>
                {availableClaims[0].provider}

                <div>
                  {t('unit.ankr-value', {
                    value: availableClaims[0].value.toFormat(),
                  })}
                </div>
              </div>
            )}

            {isFewClaims && (
              <table className={classes.table}>
                {availableClaims.map((claim, i) => (
                  <TableRow
                    key={uid(i)}
                    provider={claim.provider}
                    value={claim.value}
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
