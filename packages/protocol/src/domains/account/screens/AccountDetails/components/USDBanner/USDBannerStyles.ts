import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUSDBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2 * 3.75),
    padding: theme.spacing(2 * 2.5, 2 * 8.75, 2 * 2.5, 2 * 2.5),
    marginTop: theme.spacing(2 * 3.5),

    marginBottom: theme.spacing(2 * 3.5),
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2 * 2.5),
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  message: {
    color: theme.palette.grey[800],

    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),

    '& b': {
      color: theme.palette.warning.main,
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));
