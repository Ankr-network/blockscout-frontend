import { makeStyles } from 'tss-react/mui';

import { dialogHeaderGradient } from 'uiKit/Theme/themeUtils';

export const useMaintenanceDialogStyles = makeStyles()(theme => ({
  root: {
    width: 600,
    height: 920,

    /* hiding scrollbar styles: */
    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    borderRadius: 40,
    position: 'relative',
  },
  closeButton: {
    border: 'none',
    backgroundColor: theme.palette.background.paper,
    zIndex: 10,
    transition: 'background-color 0.3s',

    '& svg': {
      color: theme.palette.primary.main,
    },

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  content: {
    marginTop: theme.spacing(55),

    '& ul': {
      paddingInlineStart: 20,
      margin: 0,
    },
  },
  imageWrapper: {
    position: 'absolute',
    display: 'flex',
    height: 280,
    width: 'calc(100% + 80px)',
    top: -40,
    left: -40,
    overflow: 'hidden',
    background: dialogHeaderGradient,
    backgroundSize: 'auto',
  },
  image: {
    height: 280,
    width: 280,
    margin: 'auto',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));
