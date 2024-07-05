import { makeStyles } from 'tss-react/mui';

import { DEFAULT_MENU_PAPER_SHADOW } from 'modules/common/styles/const';

export const useBalanceMenuStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: theme.shape.borderRadius,

    boxShadow: DEFAULT_MENU_PAPER_SHADOW,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),

    padding: theme.spacing(),
  },
  root: {
    width: 300,
    padding: theme.spacing(6, 5),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  label: {
    margin: 0,
  },
  balance: {
    marginBottom: theme.spacing(1),
  },
  detailedBalance: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  button: {
    gap: 4,
  },
  progressBar: {
    marginBottom: theme.spacing(4),
  },
}));
