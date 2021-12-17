import { Theme } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

export const useNetworkSwitcherStyles = makeStyles<Theme>(theme => ({
  networkSwitcher: {
    border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
    borderRadius: 24,
    height: 40,
    display: 'flex',
    fontSize: 14,
    lineHeight: '150%',
    margin: theme.spacing(0, 3),
  },
  networkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    borderRight: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
    margin: theme.spacing(1, 0),
    color: alpha(theme.palette.text.primary, 0.5),

    '& > a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  activeNetworkButton: {
    color: theme.palette.text.primary,
  },
  networkHref: {
    '&:last-child > div': {
      borderRight: 'none',
    },
  },
}));
