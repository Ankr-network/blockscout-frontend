import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import { groupLeadingFloatZeroes } from 'modules/common/utils/numbers/groupLeadingFloatZeroes';

import { useLongFloatStyles } from './useLongFloatStyles';

export interface ILongFloatProps {
  value: BigNumber.Value;
  maxLength: number;
  className?: string;
}

export const LongFloat = ({
  value,
  maxLength,
  className,
}: ILongFloatProps): JSX.Element => {
  const classes = useLongFloatStyles();

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
