import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BREAKPOINTS } from 'ui';

const LOGO_WIDTH = 50;
const LOGO_MARGIN = 15;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: LOGO_WIDTH,
    marginRight: LOGO_MARGIN,
  },
  title: {
    marginBottom: 2,
    transition: 'color 0.2s',
  },
  hasLabel: {
    maxWidth: 'calc(100% - 71px)',

    [theme.breakpoints.between(BREAKPOINTS.values.md, 850)]: {
      maxWidth: '100%',
    },
  },
  right: {
    flex: 1,
    maxWidth: `calc(100% - ${LOGO_WIDTH}px - ${LOGO_MARGIN}px)`,
    position: 'relative',
  },
  req: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  skeleton: {
    width: '100%',
    maxWidth: 140,
    marginTop: 4,
    height: 23,
    transform: 'none',
  },
}));
