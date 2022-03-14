import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  right: {
    flex: 1,
    maxWidth: `calc(100% - ${LOGO_WIDTH}px - ${LOGO_MARGIN}px)`,
    position: 'relative',
  },
  archive: {
    fontSize: 12,
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 1),
    borderRadius: 6,
  },
  req: {
    display: 'flex',
    alignItems: 'center',
  },
  day: {
    marginLeft: 6,
    padding: '4px 8px',
    color: theme.palette.text.primary,
    opacity: 0.5,
    fontSize: 12,
    border: `1px solid rgba(31, 34, 38, 0.1)`,
    borderRadius: 18,
  },
}));
