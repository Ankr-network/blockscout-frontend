import { Container, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useState } from 'react';
import { uid } from 'react-uid';

import { t } from 'common';

import { DECIMAL_PLACES } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
import { Tooltip } from 'uiKit/Tooltip';

import { useHistoryDialogStyles as useStyles } from './useHistoryDialogStyles';

export interface IHistoryDialogRow {
  amount?: BigNumber;
  date?: Date;
  hash?: string;
  link?: string;
}

export interface HistoryDialogData {
  staked: IHistoryDialogRow[];
  stakedToken: Token;
  unstaked: IHistoryDialogRow[];
  unstakedToken: Token;
}

export interface IHistoryDialogProps {
  history: HistoryDialogData;
  isHistoryLoading: boolean;
  open: boolean;
  onClose?: () => void;
}

export const HistoryDialog = ({
  open,
  isHistoryLoading,
  onClose,
  history,
}: IHistoryDialogProps): JSX.Element => {
  const classes = useStyles();

  const [showType, setShowType] = useState<'staked' | 'unstaked'>('staked');

  const handleSetStakedType = () => setShowType('staked');
  const handleSetUnstakedType = () => setShowType('unstaked');

  const tableRows = history[showType]?.map(
    ({ date, link, hash, amount }, index) => (
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
              {t('history-dialog.hash-cell', { hash: getShortTxHash(hash) })}
            </NavLink>
          ) : (
            t('history-dialog.error-cell')
          )}
        </td>

        <td className={classNames(classes.td, classes.amount)}>
          {amount ? (
            <Tooltip
              arrow
              title={`${amount.toFormat()} ${history[`${showType}Token`]}`}
            >
              <div>
                {t('history-dialog.amount-cell', {
                  value: amount.decimalPlaces(DECIMAL_PLACES).toFormat(),
                  token: history[`${showType}Token`],
                })}
              </div>
            </Tooltip>
          ) : (
            t('history-dialog.error')
          )}
        </td>
      </tr>
    ),
  );

  const EmptyTransactionHistory = (
    <div className={classes.empty}>
      {isHistoryLoading ? <Spinner /> : t('history-dialog.empty')}
    </div>
  );

  const TransactionHistory = (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.theadTr}>
          <th className={classes.th}>{t('history-dialog.date')}</th>

          <th className={classes.th}>{t('history-dialog.hash')}</th>

          <th className={classes.th}>{t('history-dialog.amount')}</th>
        </tr>
      </thead>

      <tbody>{tableRows}</tbody>
    </table>
  );

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <Container className={classes.container} data-testid="history-dialog">
        <Typography className={classes.header} variant="h3">
          {t('history-dialog.header')}
        </Typography>

        <div className={classes.transactionTypeWrapper}>
          <div className={classes.transactionType}>
            <Button
              className={classNames(
                classes.typeButton,
                showType === 'staked' && classes.typeButtonActive,
              )}
              onClick={handleSetStakedType}
            >
              {t('history-dialog.staking')}
            </Button>

            <Button
              className={classNames(
                classes.typeButton,
                showType === 'unstaked' && classes.typeButtonActive,
              )}
              onClick={handleSetUnstakedType}
            >
              {t('history-dialog.unstaking')}
            </Button>
          </div>
        </div>

        {!!tableRows && !!tableRows.length
          ? TransactionHistory
          : EmptyTransactionHistory}
      </Container>
    </Dialog>
  );
};
