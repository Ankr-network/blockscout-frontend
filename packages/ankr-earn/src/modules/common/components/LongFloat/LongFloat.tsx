import { useMediaQuery, useTheme } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import { groupLeadingFloatZeroes } from 'modules/common/utils/numbers/groupLeadingFloatZeroes';

import { useLongFloatStyles } from './useLongFloatStyles';

export interface ILongFloatProps {
  value: BigNumber.Value;
  className?: string;
}

const MAX_AMOUNT_LENGTH_DESKTOP = 20;
const MAX_AMOUNT_LENGTH_MOBILE = 10;

export const LongFloat = ({
  value,
  className,
}: ILongFloatProps): JSX.Element => {
  const classes = useLongFloatStyles();

  const theme = useTheme();

  const maxLength = useMediaQuery(theme.breakpoints.up('md'))
    ? MAX_AMOUNT_LENGTH_DESKTOP
    : MAX_AMOUNT_LENGTH_MOBILE;

  const { lead, zeroesCount, number } = useMemo(
    () => groupLeadingFloatZeroes(new BigNumber(value), maxLength),
    [value, maxLength],
  );

  return (
    <span className={classNames(classes.root, className)}>
      {lead}

      {zeroesCount > 0 && <span className={classes.zeroes}>{zeroesCount}</span>}

      {!!number && number}
    </span>
  );
};
