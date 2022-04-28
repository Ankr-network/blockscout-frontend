import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const ANKR_LINK_HEIGHT = 65;
export const ITEM_HEIGHT = 48;
const MENU_MARGIN_TOP = 60;
export const MENU_WIDTH = 60;

export const useCrossMenuStyles = makeStyles<Theme, { menuHeight: number }>(
  theme => ({
    dropMenu: {
      position: 'fixed',
      top: 20,
      left: 20,
      zIndex: 220,
      visibility: 'hidden',
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        visibility: 'visible',
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
      '&.eth': {
        borderRight: `1px solid ${theme.palette.text.secondary}`,
      },
      '&.gnosis': {
        backgroundColor: theme.palette.common.white,
      },
      '&.syscoin': {
        borderRight: `1px solid ${theme.palette.primary.light}`,
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
    menu: ({ menuHeight }) => ({
      position: 'relative',

      [theme.breakpoints.up('md')]: {
        transform: 'translateY(-50%)',
        top: 'calc(50% - 33px)',
      },

      [`@media (max-height: ${menuHeight}px)`]: {
        transform: 'translateY(0)',
        top: 0,
      },

      [theme.breakpoints.down('sm')]: {
        marginTop: MENU_MARGIN_TOP,
        height: `calc(100vh - ${ANKR_LINK_HEIGHT}px - ${MENU_MARGIN_TOP}px)`,
        width: '100%',
      },
    }),
    item: {
      width: MENU_WIDTH,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',

      '&:hover $name': {
        display: 'block',
      },
      '@media (max-height: 680px)': {
        '&:hover $name': {
          display: 'none',
        },
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

      '&.gnosis': {
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
      '&.syscoin': {
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

      '&.gnosis': {
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
    bar: {
      overflow: 'initial !important',

      '& div:first-of-type': {
        overflow: 'initial !important',
      },
    },
  }),
);
