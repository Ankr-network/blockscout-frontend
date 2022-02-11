import { makeStyles, Theme } from '@material-ui/core';

export const useBridgeBlockchainPanelStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: '9px',
    background: theme.palette.background.default,
  },
  rootRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing(1.6),
  },
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
}));
