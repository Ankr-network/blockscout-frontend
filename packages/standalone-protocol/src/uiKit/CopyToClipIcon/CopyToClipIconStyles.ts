import { makeStyles, Theme, darken } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';

export const useStyles = makeStyles<Theme, { size: 'm' | 'l' }>(theme => ({
  text: {
    marginRight: theme.spacing(0.5),
    fontSize: ({ size }) => (size === 'm' ? 12 : 14),
    transition: 'color .3s',
  },
  container: {
    borderRadius: ({ size }) => (size === 'm' ? 6 : 12),
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    overflow: 'hidden',
    width: '100%',

    [`&.${ChainId.IoTeX}`]: {
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.Syscoin}`]: {
      border: `1px solid #33373B`,
      borderRadius: 50,
      '& svg': {
        color: '#33373B',
      },
    },

    [`&.${ChainId.Near}`]: {
      '& $content': {
        '&:hover': {
          background: darken(theme.palette.background.paper, 0.2),
        },
      },

      '& $message': {
        background: theme.palette.background.default,
      },
    },

    [`&.${ChainId.Nervos}`]: {
      border: `1px solid ${theme.palette.common.white}`,
    },

    [`&.${ChainId.Arbitrum}`]: {
      borderRadius: 0,
      boxShadow: `0 0 0 2px ${theme.palette.grey['200']}`,

      '& $content': {
        backgroundColor: theme.palette.background.paper,
      },
    },

    [`&.${ChainId.Gnosis}`]: {
      '& $content': {
        backgroundColor: theme.palette.common.white,

        '&:hover': {
          background: darken(theme.palette.background.paper, 0.2),
        },
      },
    },

    [`&.${ChainId.Klaytn}`]: {
      borderRadius: 0,
      height: 52,
      '&& $copyIcon': {
        color: theme.palette.primary.main,
      },

      '& $content': {
        border: `1px solid ${theme.palette.grey[300]}`,
        '&:hover': {
          backgroundColor: theme.palette.common.white,
        },
      },
    },
  },

  message: {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    fontSize: ({ size }) => (size === 'm' ? 12 : 14),
    textAlign: 'center',
    width: '100%',
    padding: ({ size }) => (size === 'm' ? '10px 9px 9px' : '10px 9px'),

    cursor: 'default',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [`&.${ChainId.Gnosis}`]: {
      backgroundColor: theme.palette.common.white,
    },
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: ({ size }) => (size === 'm' ? '8px 9px' : '10px 15px'),
    cursor: 'pointer',
    backgroundColor: theme.palette.background.default,
    minHeight: 36,
    transition: 'background .3s',

    '&:hover': {
      background: theme.palette.background.paper,

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
  },
}));
