import { makeStyles } from 'tss-react/mui';

export const useAddProjectDialogStyles = makeStyles()(theme => ({
  titleIcon: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(3),
  },
  checkIcon: {
    color: theme.palette.success.main,
  },
  failedIcon: {
    color: theme.palette.error.main,
  },
}));
