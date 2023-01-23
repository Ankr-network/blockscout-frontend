import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  detailsRoot: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2 * 0.375, 2 * 1.125),

    color: theme.palette.grey[600],

    letterSpacing: '0.01em',

    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: theme.spacing(2 * 2),
    },
  },
  marker: {
    marginTop: theme.spacing(2 * 0.375),
  },
  description: {
    fontWeight: 700,
  },
  extraDescription: {
    fontWeight: 400,
  },
  descriptions: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
