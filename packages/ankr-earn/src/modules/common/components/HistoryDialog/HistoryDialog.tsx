import { t } from '@ankr.com/common';
import { Container, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { uid } from 'react-uid';

import { DECIMAL_PLACES } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
import { Tooltip } from 'uiKit/Tooltip';

import { IHistoryDialogRow } from './types';
import { useHistoryDialogStyles as useStyles } from './useHistoryDialogStyles';

enum EHistoryTypes {
  Staked = 'staked',
  Unstaked = 'unstaked',
}

export interface IHistoryDialogData {
  staked: IHistoryDialogRow[];
  stakedToken: Token;
  unstaked: IHistoryDialogRow[];
  unstakedToken: Token;
}

export interface IHistoryDialogProps {
  history: IHistoryDialogData;
  isHistoryLoading: boolean;
  open: boolean;
  unsupportedUnstakeHistoryTxt?: string;
  onClose?: () => void;
}

export const HistoryDialog = ({
  history,
  isHistoryLoading,
  open,
  unsupportedUnstakeHistoryTxt,
  onClose,
}: IHistoryDialogProps): JSX.Element => {
  const classes = useStyles();

  const [showType, setShowType] = useState<EHistoryTypes>(EHistoryTypes.Staked);

  const handleSetStakedType = () => setShowType(EHistoryTypes.Staked);
  const handleSetUnstakedType = () => setShowType(EHistoryTypes.Unstaked);

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

  const txHistory = useMemo(() => {
    const isFullHistory = Array.isArray(tableRows) && !!tableRows.length;

    if (
      showType === EHistoryTypes.Unstaked &&
      typeof unsupportedUnstakeHistoryTxt === 'string'
    ) {
      return (
        <div className={classes.empty}>{unsupportedUnstakeHistoryTxt}</div>
      );
    }

    const emptyHistory = (
      <div className={classes.empty}>
        {isHistoryLoading ? <Spinner /> : t('history-dialog.empty')}
      </div>
    );

    const fullHistory = (
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

    return isFullHistory ? fullHistory : emptyHistory;
  }, [
    classes.empty,
    classes.table,
    classes.th,
    classes.thead,
    classes.theadTr,
    isHistoryLoading,
    showType,
    tableRows,
    unsupportedUnstakeHistoryTxt,
  ]);

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
                showType === EHistoryTypes.Staked && classes.typeButtonActive,
              )}
              onClick={handleSetStakedType}
            >
              {t('history-dialog.staking')}
            </Button>

            <Button
              className={classNames(
                classes.typeButton,
                showType === EHistoryTypes.Unstaked && classes.typeButtonActive,
              )}
              onClick={handleSetUnstakedType}
            >
              {t('history-dialog.unstaking')}
            </Button>
          </div>
        </div>

        <div className={classes.tableWrapper}>{txHistory}</div>
      </Container>
    </Dialog>
  );
};
