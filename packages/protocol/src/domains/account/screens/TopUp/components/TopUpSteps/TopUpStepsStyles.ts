import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: theme.palette.common.white,
    padding: theme.spacing(2 * 5),
    maxWidth: 494,
    height: 486,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepper: {
    background: 'transparent',
    '&&': {
      padding: theme.spacing(2 * 2.5, 0),
    },
    maxWidth: 220,
    marginBottom: theme.spacing(2 * 7),
  },
  title: {
    marginBottom: theme.spacing(2 * 2.75),

    'h3&': {
      fontSize: 24,
    },

    '& .icon': {
      verticalAlign: 'middle',
      width: 32,
      height: 40,
    },

    '& ul': {
      paddingLeft: theme.spacing(2 * 2),
      lineHeight: theme.spacing(2 * 4),
    },
  },
  notice: {
    fontWeight: 'normal',
    minHeight: 45,
    marginBottom: theme.spacing(2 * 3),
    fontSize: 18,
  },

  header: {
    fontSize: 18,
    color: theme.palette.primary.main,
  },
  error: {
    fontSize: 18,
    color: theme.palette.warning.main,
  },
}));
