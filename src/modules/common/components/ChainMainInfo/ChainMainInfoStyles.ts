import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LOGO_WIDTH = 50;
const LOGO_MARGIN = 15;

export const useStyles = makeStyles<Theme>(theme => ({
  root: { display: 'flex', alignItems: 'center' },
  logo: {
    width: LOGO_WIDTH,
    marginRight: LOGO_MARGIN,
  },
  title: {
    marginBottom: 2,
    transition: 'color 0.2s',
  },
  right: {
    maxWidth: `calc(100% - ${LOGO_WIDTH}px - ${LOGO_MARGIN}px)`,
  },
  infos: {
    display: 'flex',

    '& $info:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 22,
  },
  label: {
    marginLeft: theme.spacing(1),
    border: '1px solid rgba(31, 34, 38, 0.1)',
    borderRadius: 18,
    lineHeight: 1,
    padding: '4px 6px',
  },
}));
