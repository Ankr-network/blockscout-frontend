import { makeStyles } from '@material-ui/core';

export const useTransactionStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gridTemplateColumns: '1fr auto auto',
  },
  icon: {
    cursor: 'pointer',
  },
}));
