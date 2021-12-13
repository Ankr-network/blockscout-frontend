import { makeStyles, Theme } from '@material-ui/core';

export const useMainNavigationMobileStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(10, 5, 0, 5),
  },
  link: {
    width: 280,
    height: 50,
    borderRadius: '0',
    justifyContent: 'start',
    padding: '0',
  },
  linkWrapper: {
    '&:after': {
      display: 'block',
      content: '""',
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
  },
}));
