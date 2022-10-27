import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
    paddingRight: theme.spacing(2),
    textDecoration: 'none',
  },
  logo: {
    fontSize: 34,
    color: theme.palette.primary.main,

    [theme.breakpoints.down('md')]: {
      fontSize: 32,
    },
  },
  divider: {
    margin: theme.spacing(0, 2.3),
    backgroundColor: '#EBEDF2',

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 2),
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    lineHeight: 1,
  },
}));
