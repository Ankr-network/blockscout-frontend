import { t } from '@ankr.com/common';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';

import { LongFloat } from 'modules/common/components/LongFloat/LongFloat';
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
const MAX_AMOUNT_LENGTH_DESKTOP = 20;
const MAX_AMOUNT_LENGTH_MOBILE = 10;

export const StakeDescriptionAmount = ({
  value = ZERO,
  symbol,
  isLoading,
  isWithTooltip = true,
}: IStakeDescriptionValueProps): JSX.Element => {
  const classes = useStakeDescriptionValueStyles();
  const theme = useTheme();

  const maxLength = useMediaQuery(theme.breakpoints.up('md'))
    ? MAX_AMOUNT_LENGTH_DESKTOP
    : MAX_AMOUNT_LENGTH_MOBILE;

  const descriptionAmountElm = (
    <Typography classes={{ root: classes.root }} component="div" variant="h5">
      {isLoading ? (
        <Skeleton className={classes.titleSkeleton} width={30} />
      ) : (
        <LongFloat
          className={classes.title}
          maxLength={maxLength}
          value={value}
        />
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
