import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStatStyles = makeStyles()((theme: Theme) => ({
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: theme.spacing(4, 6),
    borderRadius: 20,
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.divider}`,
    flex: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    flex: 1,
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(1),
    },
  },
  title: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',
    fontWeight: 500,
    fontSize: 12,
  },
  value: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: 16,
  },
  skeleton: {
    width: '30%',
    height: theme.spacing(6),
    transform: 'none',
  },
}));
