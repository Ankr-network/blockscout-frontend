import { makeStyles } from 'tss-react/mui';

export const useProjectChainsTabsStyles = makeStyles()(theme => ({
  tabsRoot: {
    position: 'relative',
    borderRadius: theme.spacing(3, 3, 0, 0),
    overflow: 'hidden',
  },
  tabsWrapper: {
    gap: theme.spacing(0.5),
    overflow: 'auto',
    width: '100%',

    /* hiding scrollbar styles: */
    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  tabsInner: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    '& div': {
      width: '100%',
    },
  },
  btnArrow: {
    height: 40,

    '&&': {
      width: 40,
    },

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },

    '& svg': {
      color: theme.palette.primary.main,
    },

    '& > span': {
      display: 'flex',
    },
  },
  btnForward: {
    borderTopLeftRadius: 0,
    boxShadow: '-4px 0px 6px 0px rgba(0, 0, 0, 0.12)',
  },
  btnBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    borderTopRightRadius: 0,
    boxShadow: '4px 0px 6px 0px rgba(0, 0, 0, 0.12)',
  },
}));
