import { darken, makeStyles, Theme } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';
import { MENU_WIDTH } from 'domains/chains/screens/ChainItem/components/CrossMenu/CrossMenuStyles';

export const HEADER_HEIGHT = 121;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 0),
    color: theme.palette.text.primary,
    width: `calc(100% - ${MENU_WIDTH}px)`,
    marginLeft: MENU_WIDTH,
    [`&.${ChainId.Ethereum}`]: {
      backgroundColor: theme.palette.common.white,
    },
    [`&.${ChainId.Filecoin}`]: {
      backgroundColor: theme.palette.common.white,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  content: {
    textAlign: 'center',
  },
  rootText: {
    fontSize: '19px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  links: {
    fontSize: '16px',
    margin: theme.spacing(0, 2),
    textAlign: 'center',
    [`&.${ChainId.Moonbeam}`]: {
      '& $link': {
        color: theme.palette.success.main,
      },
    },

    [`&.${ChainId.Arbitrum}, &.${ChainId.Near}, &.${ChainId.Avalanche}`]: {
      color: theme.palette.grey['500'],

      '& $link': {
        color: theme.palette.common.black,
      },
    },

    [`&.${ChainId.Nervos}`]: {
      color: theme.palette.grey['500'],

      '& $link': {
        color: theme.palette.common.white,
      },
    },

    [`&.${ChainId.Secret}`]: {
      color: theme.palette.grey['600'],

      '& $link': {
        color: theme.palette.primary.main,

        '&:hover': {
          color: darken(theme.palette.primary.main, 0.2),
        },
      },
    },
  },
  link: {
    fontWeight: 600,
  },
  heart: {
    width: 14,
    position: 'relative',
    top: 1,
    margin: '0 2px',
  },
}));
