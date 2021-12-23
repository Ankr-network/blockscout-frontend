import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useNetworkSwitcherStyles = makeStyles<Theme>(theme => ({
  networkSwitcher: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    fontSize: 14,
    fontWeight: 700,
    border: '1px solid #e2e7f0',
    borderRadius: 12,
  },
  networkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    margin: theme.spacing(1, 0),
    color: theme.palette.text.secondary,
  },
  networkButtonActive: {
    color: theme.palette.primary.main,
    cursor: 'default',
  },
  networkSeparator: {
    borderRight: '1px solid #e2e7f0',
  },
}));
