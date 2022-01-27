import { Container, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useState } from 'react';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';
import { useHistoryDialogStyles as useStyles } from './useHistoryDialogStyles';
import { t } from 'modules/i18n/utils/intl';
import BigNumber from 'bignumber.js';
import { Token } from 'modules/common/types/token';
import { format } from 'date-fns';

export interface HistoryDialogData {
  token: Token | undefined;
  staked:
    | Array<{
        date: Date | undefined;
        amount: BigNumber | undefined;
      }>
    | undefined;
  unstaked:
    | Array<{
        date: Date | undefined;
        amount: BigNumber | undefined;
      }>
    | undefined;
}

export interface IHistoryDialogProps {
  open: boolean;
  onClose?: () => void;
  history: HistoryDialogData;
}

export const HistoryDialog = ({
  open,
  onClose,
  history,
}: IHistoryDialogProps) => {
  const classes = useStyles();

  const [showType, setShowType] = useState<'staked' | 'unstaked'>('staked');

  const handleSetStakedType = () => setShowType('staked');
  const handleSetUnstakedType = () => setShowType('unstaked');

  const tableRows = history[showType]?.map((el, index) => (
    <tr className={classes.tr} key={index}>
      <td className={classes.td}>
        {el.date
          ? t('history-dialog.date-cell', {
              month: format(el.date, 'LLLL'),
              day: format(el.date, 'dd'),
              year: format(el.date, 'yyyy'),
            })
          : t('history-dialog.error-cell')}
      </td>
      <td className={classes.td}>
        {el.amount
          ? t('history-dialog.amount-cell', {
              value: el.amount.toFormat(),
              token: history.token,
            })
          : t('history-dialog.error')}
      </td>
    </tr>
  ));

  const EmptyTransactionHistory = (
    <div className={classes.empty}>{t('history-dialog.empty')}</div>
  );

  const TransactionHistory = (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.theadTr}>
          <th className={classes.th}>{t('history-dialog.date')}</th>
          <th className={classes.th}>{t('history-dialog.amount')}</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );

  return (
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <Container className={classes.container}>
        <Typography className={classes.header} variant="h3">
          {t('history-dialog.header')}
        </Typography>
        <div className={classes.transactionTypeWrapper}>
          <div className={classes.transactionType}>
            <Button
              onClick={handleSetStakedType}
              className={classNames(
                classes.typeButton,
                showType === 'staked' && classes.typeButtonActive,
              )}
            >
              {t('history-dialog.staking')}
            </Button>
            <Button
              onClick={handleSetUnstakedType}
              className={classNames(
                classes.typeButton,
                showType === 'unstaked' && classes.typeButtonActive,
              )}
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
