import { makeStyles } from '@material-ui/core';

export const useRewardTokenInfoStyles = makeStyles(theme => ({
  root: {
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 12,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  icon: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(2),
  },

  description: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',
  },
}));
