import { makeStyles, Theme } from '@material-ui/core/styles';

export const useFairValueStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1.25, 2),
    borderRadius: 12,
    border: `2px solid ${theme.palette.background.default}`,

    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      padding: theme.spacing(1, 2, 0.75),
      minHeight: 60,
    },
  },

  description: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.2,
    marginRight: 'auto',

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 'auto'),
    },
  },

  descriptionTitle: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },

  values: {
    lineHeight: 1.2,
  },

  questionBtn: {
    padding: theme.spacing(0, 0, 0, 0.5),
  },

  questionIcon: {
    color: theme.palette.text.secondary,
  },
}));
