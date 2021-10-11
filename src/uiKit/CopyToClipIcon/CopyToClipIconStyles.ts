import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  container: {
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'space-between',
    border: `2px solid ${theme.palette.background.paper}`,
    overflow: 'hidden',
  },

  message: {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
    padding: 9,
    cursor: 'default',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: 9,
    cursor: 'pointer',
    background: theme.palette.background.paper,

    '&:hover': {
      background: theme.palette.common.white,

      '& $text': {
        color: theme.palette.text.primary,
      },

      '& $copyIcon': {
        color: theme.palette.text.primary,
      },
    },
  },

  copyIcon: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
