import { makeStyles } from 'tss-react/mui';

export const useSummaryContentStyles = makeStyles()(theme => ({
  content: {
    marginTop: theme.spacing(2),
  },
  description: {
    display: 'block',
    marginBottom: theme.spacing(6),
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.palette.background.default}`,
    padding: theme.spacing(4, 0),
  },
  total: {
    textTransform: 'uppercase',
  },
  buttons: {
    display: 'flex',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buttonWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  balance: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  tooltipItem: {
    cursor: 'default',
  },
}));
