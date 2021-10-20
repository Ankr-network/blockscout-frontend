import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  link: {
    fontSize: 30,
    fontWeight: 'bold',

    '&.custom-link:hover': {
      color: theme.palette.primary.main,
    },
  },
  text: {},
  separator: {
    fontSize: 22,
  },
  breadcrumbs: {
    alignItems: 'baseline',
    flexWrap: 'nowrap',
  },
}));
