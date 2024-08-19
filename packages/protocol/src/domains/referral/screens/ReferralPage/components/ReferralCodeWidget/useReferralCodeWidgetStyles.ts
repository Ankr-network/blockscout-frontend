import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useReferralCodeWidgetStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(4),

    width: 568,
    height: 236,
    padding: theme.spacing(8),

    backgroundColor: alpha(theme.palette.background.default, 0.8),
    backdropFilter: 'blur(15px)',

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(3),

      width: '100%',
      height: 'auto',

      backgroundColor: theme.palette.background.paper,
      backdropFilter: 'none',
    },
  },
}));
