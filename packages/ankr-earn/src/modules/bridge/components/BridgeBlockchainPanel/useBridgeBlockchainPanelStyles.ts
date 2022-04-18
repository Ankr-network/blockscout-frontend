import { makeStyles } from '@material-ui/core';

export const useBridgeBlockchainPanelStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 0.1fr',
    alignItems: 'center',
    gap: theme.spacing(0, 1.25),
    padding: theme.spacing(2.5, 2),
    position: 'relative',
    borderRadius: '9px',
    background: theme.palette.background.default,
    cursor: 'pointer',
    userSelect: 'none',
  },

  icon: {
    width: 32,
    height: 32,
  },

  title: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },

  list: {
    position: 'absolute',
    zIndex: 999,
    borderRadius: '12px',
    width: 'auto',
    background: theme.palette.background.paper,
    top: 'calc(100% + 10px)',
    boxShadow: '0px 2px 10px rgba(154, 161, 176, 0.3)',
    '& > div:last-child': {
      borderBottom: '1px solid transparent',
    },
  },

  listItem: {
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.background.default}`,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  listItemActive: {
    color: theme.palette.primary.main,
  },

  listItemDisalbed: {
    color: theme.palette.text.disabled,
    pointerEvents: 'none',
  },

  listItemIcon: {
    marginRight: theme.spacing(1),
  },
}));
