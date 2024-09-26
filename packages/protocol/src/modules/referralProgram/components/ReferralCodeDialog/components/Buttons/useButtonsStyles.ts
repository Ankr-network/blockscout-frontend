import { makeStyles } from 'tss-react/mui';

export const useButtonsStyles = makeStyles()(theme => ({
  referralCodeDialogButtonsRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));
