import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useItemHeaderStyles = makeStyles()((theme: Theme) => ({
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2.5),
    lineHeight: theme.spacing(2 * 3.5),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2 * 2),
      lineHeight: theme.spacing(2 * 3),
    },
  },
  timeframe: {
    display: 'flex',
    alignItems: 'center',

    padding: theme.spacing(2 * 0.25, 2),

    borderRadius: theme.spacing(2),

    background: theme.palette.background.default,

    letterSpacing: '0.01em',
    color: theme.palette.grey[600],

    fontWeight: 400,
    fontSize: theme.spacing(2 * 1.75),
    lineHeight: theme.spacing(2 * 2.5),
  },
}));
