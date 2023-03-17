import { makeStyles } from 'tss-react/mui';

export const useViewProjectDialogStyles = makeStyles()(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 28,
    lineHeight: 1.15,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  content: {
    marginTop: theme.spacing(5),
  },
  legend: {
    color: theme.palette.text.primary,
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  filed: {
    marginBottom: theme.spacing(5),
    height: theme.spacing(12),
  },
  button: {
    marginTop: theme.spacing(5),
  },
}));
