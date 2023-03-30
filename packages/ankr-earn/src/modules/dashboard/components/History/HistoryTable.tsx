import { t } from '@ankr.com/common';
import classNames from 'classnames';
import { format } from 'date-fns';
import { uid } from 'react-uid';

import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { IHistoryTableRow } from 'modules/dashboard/types';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { useHistoryStyles } from './useHistoryStyles';

interface IHistoryTableProps {
  data?: IHistoryTableRow[];
  token: string;
}

export const HistoryTable = ({
  data = [],
  token,
}: IHistoryTableProps): JSX.Element => {
  const classes = useHistoryStyles();
  const tokenName = getTokenName(token);

  if (!data.length) {
    return <div className={classes.empty}>{t('history-dialog.empty')}</div>;
  }

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr>
          <th className={classes.th}>{t('history-dialog.date')}</th>

          <th className={classes.th}>{t('history-dialog.hash')}</th>

          <th className={classes.th}>{t('history-dialog.amount')}</th>
        </tr>
      </thead>

      <tbody>
        {data.map(({ date, link, hash, amount }, index) => {
          return (
            <tr key={uid(index)} className={classes.tr}>
              <td className={classes.td}>
                {date
                  ? t('history-dialog.date-cell', {
                      month: format(date, 'LLLL'),
                      day: format(date, 'dd'),
                      year: format(date, 'yyyy'),
                    })
                  : t('history-dialog.error-cell')}
              </td>

              <td className={classes.td}>
                {link && hash ? (
                  <NavLink className={classes.txLink} href={link}>
                    {t('history-dialog.hash-cell', {
                      hash: getShortTxHash(hash),
                    })}
                  </NavLink>
                ) : (
                  t('history-dialog.error-cell')
                )}
              </td>

              <td className={classNames(classes.td)}>
                {amount ? (
                  <Tooltip
                    arrow
                    title={t('unit.token-value', {
                      token: tokenName,
                      value: amount.toFormat(),
                    })}
                  >
                    <span>
                      <span className={classNames(classes.amount)}>
                        {amount.round().toFormat()}
                      </span>

                      {tokenName}
                    </span>
                  </Tooltip>
                ) : (
                  t('history-dialog.error')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
