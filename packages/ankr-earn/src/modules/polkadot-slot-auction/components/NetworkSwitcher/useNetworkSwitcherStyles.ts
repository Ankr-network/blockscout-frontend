import { Theme } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

export const useNetworkSwitcherStyles = makeStyles<Theme>(theme => ({
  networkSwitcher: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    background: alpha(theme.palette.text.secondary, 0.15),
    borderRadius: 16,
    padding: theme.spacing(0.5),
  },
  networkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 36,
    background: 'none',
    color: theme.palette.text.secondary,
  },
  networkButtonActive: {
    color: theme.palette.primary.main,
    cursor: 'default',
    background: theme.palette.background.paper,
    padding: theme.spacing(0.5, 0),
    borderRadius: 12,
  },
}));
