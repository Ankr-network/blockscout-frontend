import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
    paddingRight: theme.spacing(2 * 2),
  },
  logo: {
    fontSize: 34,
    color: theme.palette.primary.main,

    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  divider: {
    margin: theme.spacing(2 * 0, 2 * 2.3),
    backgroundColor: theme.palette.grey[100],

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2 * 0, 2 * 2),
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: theme.spacing(2 * 1),
    lineHeight: 1,
  },
}));
