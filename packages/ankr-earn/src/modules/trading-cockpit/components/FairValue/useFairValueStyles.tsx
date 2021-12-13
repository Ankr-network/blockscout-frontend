import { makeStyles, Theme } from '@material-ui/core/styles';

export const useFairValueStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1.25, 2),
    background: theme.palette.background.paper,
    borderRadius: '12px',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
    },
  },

  description: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.2,
    marginRight: 'auto',

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0.75),
    },
  },

  descriptionTitle: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },

  values: {
    lineHeight: 1.2,
    fontWeight: 500,
  },

  question: {
    padding: theme.spacing(0, 0, 0, 0.5),
  },
}));
