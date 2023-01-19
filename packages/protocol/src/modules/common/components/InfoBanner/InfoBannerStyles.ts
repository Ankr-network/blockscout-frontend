import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useInfoBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2 * 2.5),
    padding: theme.spacing(2 * 2),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2 * 2.5),
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gridGap: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  icon: {
    display: 'inline-flex',

    '& svg': {
      width: 48,
      height: '100%',
    },
  },
  message: {
    color: theme.palette.grey[800],

    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
}));
