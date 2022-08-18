import { makeStyles } from '@material-ui/core';

export const useStakeStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },

  liquidityPoolArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(2.5, 0, 0, 0),
    padding: theme.spacing(0, 0, 0, 1),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },

  questionBtn: {
    margin: theme.spacing('-1px', 0, 0, '3px'),
  },
}));
