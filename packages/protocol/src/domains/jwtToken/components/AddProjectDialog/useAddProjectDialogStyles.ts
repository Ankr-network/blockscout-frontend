import { makeStyles } from 'tss-react/mui';

export const useAddProjectDialogStyles = makeStyles()(theme => ({
  initial: {
    fontSize: 28,
    lineHeight: '32.2px',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 35,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 700,
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
}));
