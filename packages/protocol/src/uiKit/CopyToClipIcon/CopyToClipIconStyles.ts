import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<
  Theme,
  { size: 'm' | 'l'; isDisabled?: boolean }
>(theme => ({
  text: {
    marginRight: theme.spacing(0.5),
    fontSize: ({ size }) => (size === 'm' ? 12 : 14),
    transition: 'color .3s',
  },
  container: {
    borderRadius: ({ size }) => (size === 'm' ? 6 : 12),
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    overflow: 'hidden',
  },

  message: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    color: theme.palette.text.primary,
    background: theme.palette.background.default,
    fontSize: ({ size }) => (size === 'm' ? 12 : 14),
    textAlign: 'center',
    width: '100%',
    padding: ({ size }) => (size === 'm' ? '10px 9px 9px' : '10px 9px'),
    lineHeight: 1.43,

    cursor: 'default',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: ({ size }) => (size === 'm' ? '8px 9px' : '10px 15px'),
    cursor: ({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer'),
    background: theme.palette.background.default,
    minHeight: 36,
    transition: 'background .3s',

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
    transition: 'color .3s',
  },
  copy: {
    display: 'flex',
    alignItems: 'center',
  },
  copyText: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
    transition: 'color .3s',
    lineHeight: 1,
  },
}));