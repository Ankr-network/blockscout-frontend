import { Theme, fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChainId } from 'domains/chains/api/chain';
import { MENU_LIST } from './MenuList';

export const ANKR_LINK_HEIGHT = 65;
export const MENU_WIDTH = 60;

const ITEM_HEIGHT = 48;
const ANKR_HEIGHT = 66;
const MENU_TOP = 60;

export const useCrossMenuStyles = makeStyles<Theme>(theme => ({
  dropMenu: {
    '&&': {
      position: 'fixed',
      top: 108,
      left: 8,
      zIndex: 220,
      visibility: 'hidden',
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        visibility: 'visible',
      },
    },
  },
  closeIcon: {
    '&&': {
      top: 20,
    },
  },
  root: {
    width: MENU_WIDTH,
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 210,
    backgroundColor: theme.palette.background.default,
    [`&.${ChainId.Ethereum}`]: {
      borderRight: `1px solid ${theme.palette.text.secondary}`,
    },
    [`&.${ChainId.Gnosis}`]: {
      backgroundColor: theme.palette.common.white,
    },
    [`&.${ChainId.Syscoin}`]: {
      borderRight: `1px solid ${theme.palette.primary.light}`,
    },
    [`&.${ChainId.Klaytn}`]: {
      borderRight: `1px solid ${theme.palette.primary.light}`,
    },
    [`&.${ChainId.Filecoin}`]: {
      borderRight: `1px solid ${theme.palette.text.secondary}`,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  open: {
    display: 'block',
    width: `calc(100% - 20px)`,
    paddingBottom: 0,
    '&&': {
      borderRight: 'none',
    },
    '& $menu': {
      left: 20,

      [theme.breakpoints.down('sm')]: {
        left: 30,
      },
    },
    '& $name': {
      display: 'block',
      left: 40,
      fontSize: 18,
      fontWeight: 600,
    },
    '& $item': {
      width: 'auto',
      marginBottom: 12,
    },
    '&& $item svg': {
      width: 28,
      height: 28,
    },
    '& $logo': {
      opacity: 1,
    },
    '& $protocol': {
      display: 'flex',
    },
    '& $desc': {
      display: 'inline-block',
      position: 'static',
      borderRadius: 0,
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
  menu: {
    height: MENU_LIST.length * ITEM_HEIGHT,
    position: 'fixed',
    top: `calc(50% - ${ANKR_HEIGHT / 2}px)`,
    marginTop: `-${(MENU_LIST.length * ITEM_HEIGHT) / 2}px`,
    width: 56,
    '&::-webkit-scrollbar': {
      width: 6,
      height: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: fade(theme.palette.text.primary, 0.2),
      borderRadius: 3,
    },
    [`@media(max-height:${MENU_LIST.length * ITEM_HEIGHT + ANKR_HEIGHT}px)`]: {
      top: 0,
      marginTop: 0,
      height: `calc(100vh - ${ANKR_HEIGHT}px)`,
      overflow: 'auto',
      '& $name': {
        position: 'fixed',
      },
    },
    [theme.breakpoints.down('sm')]: {
      top: MENU_TOP,
      width: '100%',
      marginTop: 0,
      height: `calc(100vh - ${ANKR_HEIGHT}px - ${MENU_TOP}px)`,
      overflow: 'auto',
      '& $item': {
        justifyContent: 'flex-start',
      },
      '& $logo': {
        width: 'auto',
      },
      '& $name': {
        position: 'static',
      },
    },
  },
  item: {
    width: 60,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 0',
    position: 'relative',
    '&:hover $name': {
      display: 'block',
    },

    '&:hover svg': {
      width: 36,
      height: 36,
    },
    '&:hover $logo': {
      opacity: 1,
    },

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.4,
    '& svg': {
      width: 24,
      height: 24,
      borderRadius: '50%',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  current: {
    opacity: 1,
    '& svg': {
      width: 36,
      height: 36,
    },
  },
  name: {
    fontSize: 19,
    lineHeight: 1,
    borderRadius: 8,
    padding: theme.spacing(1, 1.5),
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: 6,
    left: 62,
    backgroundColor: theme.palette.background.default,
    display: 'none',

    [`&.${ChainId.Gnosis}`]: {
      backgroundColor: theme.palette.common.white,
    },
  },
  protocol: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    width: 48,
    padding: '18px 0',
    margin: '0 6px',
    borderTop: `1px solid ${theme.palette.background.paper}`,
    [`&.${ChainId.Syscoin}`]: {
      borderTop: `1px solid ${theme.palette.primary.light}`,
    },
    [`&.${ChainId.Klaytn}`]: {
      borderTop: `1px solid ${theme.palette.primary.light}`,
    },
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    '&:hover $desc': {
      display: 'inline',
    },
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - 40px)`,
      boxSizing: 'border-box',
      textAlign: 'left',
      margin: '0 20px',
    },

    [`&.${ChainId.Gnosis}`]: {
      backgroundColor: theme.palette.common.white,
    },
  },
  desc: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 18,
    display: 'none',
    opacity: 0.8,
    whiteSpace: 'nowrap',
    borderRadius: 8,
    padding: theme.spacing(1, 1.5),
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    top: 6,
    left: 50,
  },
}));
