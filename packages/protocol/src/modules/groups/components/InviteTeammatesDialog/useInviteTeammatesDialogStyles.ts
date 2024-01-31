import { makeStyles } from 'tss-react/mui';

export const useInviteTeammatesDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,
  },
  title: {
    color: theme.palette.grey[900],
  },
}));
