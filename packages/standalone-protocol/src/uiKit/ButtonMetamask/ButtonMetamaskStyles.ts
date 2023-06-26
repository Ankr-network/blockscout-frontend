import { darken, lighten, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ChainId } from 'domains/chains/api/chain';

export const useButtonMetamaskStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: 7,
    position: 'relative',
    overflow: 'visible',

    backgroundColor: theme.palette.background.default,
    borderRadius: 12,

    [`&.${ChainId.Harmony}`]: {
      border: `2px solid ${theme.palette.grey['300']}`,
    },

    [`&.${ChainId.Near}`]: {
      '&:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.1),
      },
    },

    [`&.${ChainId.Arbitrum}`]: {
      borderRadius: 0,
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.paper,

      '&:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.1),
      },
    },

    [`&.${ChainId.IoTeX}`]: {
      border: `1px solid ${theme.palette.grey['200']}`,
      background: theme.palette.background.default,
    },

    [`&.${ChainId.Avalanche}`]: {
      background: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,
    },

    [`&.${ChainId.Nervos}`]: {
      border: `1px solid ${theme.palette.common.white}`,
      background: theme.palette.background.default,

      '&:hover': {
        backgroundColor: lighten(theme.palette.background.default, 0.1),
      },
    },

    [`&.${ChainId.Secret}`]: {
      background: '#303C4A',
      borderRadius: theme.spacing(1.25),

      '&:hover': {
        backgroundColor: darken('#303C4A', 0.2),
      },
    },

    '&:hover': {
      backgroundColor: theme.palette.background.paper,

      '& $plusIconWrapper': {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    '&:disabled': {
      opacity: 0.4,
      '& $plusIconWrapper': {
        backgroundColor: '#767c82',
      },
    },
  },
  size_large: {
    minWidth: 72,
    minHeight: 72,

    /* size for metamask fox icon */
    '& > span > svg': {
      width: 42,
      height: 42,
    },
  },
  size_medium: {
    minWidth: 42,
    minHeight: 42,
  },
  plusIconWrapper: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    padding: 4,
    borderRadius: '50%',
    lineHeight: 0,
    right: -13,
    bottom: -17,
    transition: 'background-color .3s',
  },
}));
