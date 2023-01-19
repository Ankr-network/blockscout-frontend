import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2 * 4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: theme.spacing(2 * 3.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2 * 4),
    },
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    color: theme.palette.grey[600],
  },
  define: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: theme.spacing(2 * 3.5),
    marginBottom: theme.spacing(2 * 1),
    '&:last-child': {
      marginRight: 0,
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: '0.01em',
    marginRight: theme.spacing(2 * 0.5),
  },
  content: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: '0.01em',
    marginLeft: theme.spacing(2 * 0.5),
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2 * 0.25, 2 * 1),
  },
  blockNumber: {
    width: 90,
  },
  skeleton: {
    height: 24,
    marginTop: theme.spacing(2 * -0.5),
  },
}));
