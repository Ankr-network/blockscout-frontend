import { makeStyles } from 'tss-react/mui';

export const useEditPlanDialogStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
  button: {
    minHeight: 48,
  },
}));
