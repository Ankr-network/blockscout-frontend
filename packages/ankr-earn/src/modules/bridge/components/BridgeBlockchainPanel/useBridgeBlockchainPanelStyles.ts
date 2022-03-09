import { makeStyles } from '@material-ui/core';

export const useBridgeBlockchainPanelStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: theme.spacing(0, 1.25),
    padding: theme.spacing(2.5, 2),

    borderRadius: '9px',
    background: theme.palette.background.default,
  },

  icon: {
    width: 32,
    height: 32,
  },

  title: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
}));
