import classNames from 'classnames';
import { cloneElement, ReactText } from 'react';

import { t } from 'common';

import { useTokenWithIconStyles } from './useTokenWithIconStyles';

interface ITokenWithIconProps {
  iconSlot: JSX.Element;
  token: string;
  apy?: ReactText;
}

export const TokenWithIcon = ({
  iconSlot,
  token,
  apy,
}: ITokenWithIconProps): JSX.Element => {
  const classes = useTokenWithIconStyles();

  return (
    <div className={classNames(classes.root)}>
      {cloneElement(iconSlot, { className: classes.icon })}

      <span className={classes.token}>{token}</span>

      <span className={classes.apy}>
        {t('calc.table.apy-label-value', { value: apy })}
      </span>
    </div>
  );
};
