import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  root: {},

  title: {
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5),
    },
  },

  footnote: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    lineHeight: 1.25,
    fontSize: 13,
    color: theme.palette.text.primary,
  },

  link: {
    lineHeight: 'inherit',
    fontSize: 'inherit',
  },
}));
