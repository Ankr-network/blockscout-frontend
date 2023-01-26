import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { Tooltip } from 'uiKit/Tooltip';

import { useStakeDescriptionValueStyles } from './useStakeDescriptionAmountStyles';

export interface IStakeDescriptionValueProps {
  value: string;
  symbol: string;
  isLoading?: boolean;
  isWithTooltip?: boolean;
}

const ENTER_DELAY = 1_000;

export const StakeDescriptionAmount = ({
  value,
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
        <span className={classes.title}>{value}</span>
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
