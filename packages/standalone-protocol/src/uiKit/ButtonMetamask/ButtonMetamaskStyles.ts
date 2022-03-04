import { makeStyles } from '@material-ui/styles';
import { darken, Theme, lighten } from '@material-ui/core';

export const useButtonMetamaskStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: 7,
    position: 'relative',
    overflow: 'visible',

    backgroundColor: theme.palette.background.default,
    borderRadius: 12,

    '&.near': {
      '&:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.1),
      },
    },

    '&.arbitrum': {
      borderRadius: 0,
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.paper,

      '&:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.1),
      },
    },

    '&.iotex': {
      border: `1px solid ${theme.palette.grey['200']}`,
      background: theme.palette.background.default,
    },

    '&.avalanche': {
      background: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,
    },

    '&.nervos': {
      border: `1px solid ${theme.palette.common.white}`,
      background: theme.palette.background.default,

      '&:hover': {
        backgroundColor: lighten(theme.palette.background.default, 0.1),
      },
    },

    '&.erigonbsc': {
      transition: 'background-color .3s',

      '&:hover': {
        backgroundColor: theme.palette.common.white,
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
