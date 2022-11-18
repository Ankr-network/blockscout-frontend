import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { DECIMAL_PLACES } from 'modules/common/const';

import { useTableRowStyles } from './useTableRowStyles';

interface ITableRowProps {
  provider: string;
  value: BigNumber;
}

export const TableRow = ({ provider, value }: ITableRowProps): JSX.Element => {
  const classes = useTableRowStyles();

  return (
    <tr className={classes.tr}>
      <td className={classNames(classes.td, classes.left)}>{provider}</td>

      <td className={classNames(classes.td, classes.right)}>
        {t('unit.ankr-value', {
          value: value.decimalPlaces(DECIMAL_PLACES).toFormat(),
        })}
      </td>
    </tr>
  );
};
