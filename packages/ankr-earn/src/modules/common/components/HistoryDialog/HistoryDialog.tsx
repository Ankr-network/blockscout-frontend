import { Container, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useState } from 'react';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../TableComponents';
import { useHistoryDialogStyles as useStyles } from './useHistoryDialogStyles';

export interface HistoryDialogData {
  staked: Array<{
    date: string;
    amount: string;
  }>;
  unstaked: Array<{
    date: string;
    amount: string;
  }>;
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

  const [showType, setShowType] = useState<keyof HistoryDialogData>('staked');

  const handleSetStakedType = () => setShowType('staked');
  const handleSetUnstakedType = () => setShowType('unstaked');

  const tableRows = history[showType].map((el, index) => (
    <tr className={classes.tr} key={index}>
      <td className={classes.td}>{el.date}</td>
      <td className={classes.td}>{el.amount}</td>
    </tr>
  ));

  return (
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <Container className={classes.container}>
        <Typography className={classes.header} variant="h3">
          Transactions history
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
              Staking
            </Button>
            <Button
              onClick={handleSetUnstakedType}
              className={classNames(
                classes.typeButton,
                showType === 'unstaked' && classes.typeButtonActive,
              )}
            >
              Unstaking
            </Button>
          </div>
        </div>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.theadTr}>
              <th className={classes.th}>123</th>
              <th className={classes.th}>123</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </Container>
    </Dialog>
  );
};
