import { makeStyles } from 'tss-react/mui';

export const useWhitelistStepStyles = makeStyles()(theme => ({
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
  },
  chainItemWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(6),
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: theme.spacing(1),
  },
  whitelistInputWrapper: {
    width: '100%',
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  whitelistInput: {
    marginTop: theme.spacing(4),
    width: 450,
  },
  success: {
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
    marginTop: '-20px',
  },
  iconCheck: {
    color: theme.palette.success.main,
  },
  plug: {
    whiteSpace: 'pre-wrap',
    marginBottom: theme.spacing(6),
    maxWidth: 450,
  },
  counters: {
    marginBottom: theme.spacing(10),
  },
}));
