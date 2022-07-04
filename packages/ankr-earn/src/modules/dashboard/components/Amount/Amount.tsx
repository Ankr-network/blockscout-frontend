import { ButtonBase, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { DEFAULT_FIXED } from 'modules/common/const';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

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
  const isActiveAmountInfo = !!infoSlot;

  return (
    <>
      {value && (
        <Typography className={classes.amount}>
          {value.decimalPlaces(DEFAULT_FIXED).toFormat()}
        </Typography>
      )}

      {isActiveAmountInfo && (
        <Typography
          className={classes.amountInfo}
          color="textSecondary"
          variant="subtitle1"
        >
          {infoSlot}

          {infoTooltip && (
            <Tooltip arrow title={infoTooltip}>
              <ButtonBase className={classes.tooltipBtn}>
                <QuestionIcon
                  className={classes.amountInfoIcon}
                  htmlColor="inherit"
                  size="xs"
                />
              </ButtonBase>
            </Tooltip>
          )}
        </Typography>
      )}
    </>
  );
};
