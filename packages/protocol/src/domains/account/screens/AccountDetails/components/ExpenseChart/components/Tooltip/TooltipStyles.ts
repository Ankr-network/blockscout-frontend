import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  tooltipRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(2 * 2, 2 * 3),
    borderRadius: 18,

    backgroundColor: theme.palette.common.white,

    boxShadow:
      '0 0 25px rgba(31, 34, 38, 0.1), 0 5px 100px rgba(31, 34, 38, 0.15)',

    letterSpacing: '0.01em',

    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),
  },
  value: {
    color: theme.palette.text.primary,

    fontWeight: 700,
  },
  time: {
    color: theme.palette.grey[600],

    fontWeight: 400,
  },
}));
