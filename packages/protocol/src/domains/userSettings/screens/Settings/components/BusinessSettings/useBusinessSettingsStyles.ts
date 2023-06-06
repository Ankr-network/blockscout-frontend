import { makeStyles } from 'tss-react/mui';

export const useBusinessSettingsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    padding: theme.spacing(7.5),
    gap: theme.spacing(5),

    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: 218,
  },
  title: {
    letterSpacing: '-0.03em',

    color: theme.palette.grey[900],

    fontWeight: 700,
    fontSize: 28,
    lineHeight: '32px',
  },
  description: {
    letterSpacing: '-0.01em',

    color: theme.palette.grey[600],

    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
  },

  button: {
    height: 48,

    letterSpacing: '-0.01em',

    color: theme.palette.primary.contrastText,

    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
  startIcon: {
    '&&': {
      svg: {
        fontSize: 24,
      },
    },
  },
}));
