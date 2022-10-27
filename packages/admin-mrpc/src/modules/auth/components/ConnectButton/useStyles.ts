import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  menuButton: {
    padding: theme.spacing(3, 4),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  button: {
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      border: '2px solid rgba(31, 34, 38, 0.1)',
    },
  },
  metamaskIcon: {
    marginRight: theme.spacing(2),
  },
}));
