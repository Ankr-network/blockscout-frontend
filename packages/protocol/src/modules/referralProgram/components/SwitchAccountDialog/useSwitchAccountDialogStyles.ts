import { makeStyles } from 'tss-react/mui';

export const useSwitchAccountDialogStyles = makeStyles()(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));
