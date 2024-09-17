import { makeStyles } from 'tss-react/mui';

const name = 'TopUpPAYGBalanceDialogButtons';

export const useButtonsStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));
