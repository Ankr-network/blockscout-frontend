import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { size: 'm' | 'l' }>(theme => ({
  text: {
    marginRight: theme.spacing(0.5),
    fontSize: ({ size }) => (size === 'm' ? 12 : 14),
  },
  container: {
    borderRadius: ({ size }) => (size === 'm' ? 6 : 12),
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    overflow: 'hidden',
  },

  message: {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    fontSize: ({ size }) => (size === 'm' ? 12 : 14),
    textAlign: 'center',
    width: '100%',
    padding: ({ size }) => (size === 'm' ? '10px 9px 9px' : '10px 9px'),

    cursor: 'default',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: ({ size }) => (size === 'm' ? '8px 9px' : '10px 15px'),
    cursor: 'pointer',
    background: theme.palette.background.paper,
    minHeight: 36,

    '&:hover': {
      background: theme.palette.common.white,

      '& $text': {
        color: theme.palette.text.primary,
      },

      '& $copyIcon, & $copyText': {
        color: theme.palette.text.primary,
      },
    },
  },

  copyIcon: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  copy: {
    display: 'flex',
    alignItems: 'center',
  },
  copyText: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
  },
}));
