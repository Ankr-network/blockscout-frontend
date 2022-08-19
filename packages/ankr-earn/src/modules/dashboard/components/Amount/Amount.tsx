import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { DEFAULT_FIXED } from 'modules/common/const';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useAmountStyles } from './useAmountStyles';

interface IAmountProps {
  value?: BigNumber;
  infoSlot?: ReactNode;
  infoTooltip?: ReactNode;
}

export const Amount = ({
  value,
  infoSlot,
  infoTooltip,
}: IAmountProps): JSX.Element => {
  const classes = useAmountStyles();

  return (
    <>
      {value && (
        <Typography className={classes.amount}>
          {value.decimalPlaces(DEFAULT_FIXED).toFormat()}
        </Typography>
      )}

      {infoSlot && (
        <Typography className={classes.amountInfo} color="textSecondary">
          {infoSlot}

          <QuestionWithTooltip>{infoTooltip}</QuestionWithTooltip>
        </Typography>
      )}
    </>
  );
};
