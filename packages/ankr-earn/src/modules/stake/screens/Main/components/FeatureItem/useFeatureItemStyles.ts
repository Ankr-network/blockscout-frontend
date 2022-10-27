import { makeStyles } from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';

const transitionsConfig = {
  duration: 350,
  easing: 'ease',
};

const boxPadding = 4;

export const useFeatureItemStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100%',
    padding: theme.spacing(4.5, 4, 3, 4),
    transition: transitions.create(
      ['box-shadow', 'transform'],
      transitionsConfig,
    ),

    '&:hover': {
      boxShadow: '0px 9px 11px #D8DFEA, 0px 0px 4px #E1E5EC',
      transform: 'translateY(-5px)',
    },
  },

  rootWithAnimations: {},

  icon: {
    display: 'block',
    fontSize: 64,
    transformOrigin: 'top left',
    transition: transitions.create('transform', transitionsConfig),
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    transition: transitions.create('transform', transitionsConfig),
    transformOrigin: 'top left',
  },

  stats: {
    transition: transitions.create('opacity', transitionsConfig),

    '$rootWithAnimations:hover &': {
      opacity: 0,
    },
  },

  statLabel: {
    fontSize: 14,
    color: `${theme.palette.text.secondary}`,
  },

  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttons: {
    position: 'absolute',
    right: theme.spacing(boxPadding),
    left: theme.spacing(boxPadding),
    bottom: theme.spacing(boxPadding),

    height: 40,

    opacity: 0,
    transform: `translateY(20px)`,
    transition: transitions.create(['opacity', 'transform'], transitionsConfig),

    '$rootWithAnimations:hover &': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  button: {
    height: 40,
    borderRadius: 16,
  },

  skeleton: {
    borderRadius: 8,
  },
}));
