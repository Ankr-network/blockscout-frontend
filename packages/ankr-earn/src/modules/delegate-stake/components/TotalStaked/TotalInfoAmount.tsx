import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';

import { useTotalStakedStyles } from './useTotalStakedStyles';

interface ITotalInfoAmountProps {
  value?: BigNumber;
  usdValue?: BigNumber;
  isLoading?: boolean;
}

export const TotalInfoAmount = ({
  value = ZERO,
  usdValue = ZERO,
  isLoading = false,
}: ITotalInfoAmountProps): JSX.Element => {
  const classes = useTotalStakedStyles();
  const formattedValue = value.decimalPlaces(DEFAULT_ROUNDING).toFormat();

  return (
    <>
      <div className={classes.amount} title={formattedValue}>
        {isLoading ? <Skeleton width={80} /> : formattedValue}
      </div>

      <div className={classes.usdAmount}>
        {isLoading ? (
          <Skeleton width={40} />
        ) : (
          t('unit.usd-value', {
            value: usdValue.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
          })
        )}
      </div>
    </>
  );
};
