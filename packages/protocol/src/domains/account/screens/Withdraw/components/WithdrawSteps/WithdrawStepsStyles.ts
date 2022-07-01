import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FONTS } from 'ui';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: theme.palette.common.white,
    padding: 40,
    maxWidth: 480,
    minHeight: 486,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {},
  stepper: {
    background: 'transparent',
    padding: '20px 0 !important',
    maxWidth: 220,
    marginBottom: theme.spacing(7),
  },
  title: {
    marginBottom: theme.spacing(2.75),
    fontFamily: `${FONTS.secondary}`,

    'h3&': {
      fontSize: 24,
    },

    '& .icon': {
      verticalAlign: 'middle',
    },
  },
  notice: {
    fontWeight: 'lighter',
    minHeight: 45,
    marginBottom: theme.spacing(3),
  },
  button: {
    maxWidth: 210,
  },

  header: {
    color: theme.palette.primary.main,
  },
  error: {
    color: '#EEA941',
  },
}));
