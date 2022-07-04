import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { DECIMAL_PLACES } from 'modules/common/const';

import { useClaimDialogStyles } from './useClaimDialogStyles';

interface ITableRowProps {
  provider: string;
  value: BigNumber;
}

export const TableRow = ({ provider, value }: ITableRowProps): JSX.Element => {
  const classes = useClaimDialogStyles();

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
