import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';

import { LongFloat } from 'modules/common/components/LongFloat';
import { ZERO } from 'modules/common/const';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakeDescriptionValueStyles } from './useStakeDescriptionAmountStyles';

export interface IStakeDescriptionValueProps {
  value?: BigNumber.Value;
  symbol: string;
  isLoading?: boolean;
  isWithTooltip?: boolean;
}

const ENTER_DELAY = 1_000;

export const StakeDescriptionAmount = ({
  value = ZERO,
  symbol,
  isLoading,
  isWithTooltip = true,
}: IStakeDescriptionValueProps): JSX.Element => {
  const classes = useStakeDescriptionValueStyles();

  const descriptionAmountElm = (
    <Typography classes={{ root: classes.root }} component="div" variant="h5">
      {isLoading ? (
        <Skeleton className={classes.titleSkeleton} width={30} />
      ) : (
        <LongFloat className={classes.title} value={value} />
      )}

      {symbol}
    </Typography>
  );

  if (!isWithTooltip) {
    return descriptionAmountElm;
  }

  return (
    <Tooltip
      arrow
      enterDelay={ENTER_DELAY}
      title={t('unit.token-value', {
        token: symbol,
        value,
      })}
    >
      {descriptionAmountElm}
    </Tooltip>
  );
};
