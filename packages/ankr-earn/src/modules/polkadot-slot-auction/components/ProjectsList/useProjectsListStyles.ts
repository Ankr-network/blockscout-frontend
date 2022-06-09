import { makeStyles } from '@material-ui/core';

export const useProjectsListStyles = makeStyles(theme => ({
  label: {
    position: 'absolute',
    top: -13,
    left: -12,
    padding: theme.spacing(0.5, 1.25),
    fontSize: 13,
    lineHeight: 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: 7,

    [theme.breakpoints.up('md')]: {
      top: 0,
      left: 0,
    },
  },

  projectBox: {
    display: 'inline-flex',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  bondTokenValuesCol: {
    fontSize: 14,
  },

  buttonCol: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    position: 'relative',
  },
  plus: {
    margin: theme.spacing('1px', 0, 0, 1),
    fontSize: 22,
  },
  connectTooltip: {
    margin: theme.spacing(0, 0, 0, 1),
  },

  noCrowdloanArea: {
    padding: theme.spacing(3, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 0),
    },
  },
}));
