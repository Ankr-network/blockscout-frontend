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
    padding: theme.spacing(boxPadding),
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

    '$rootWithAnimations:hover &': {
      transform: 'scale(0.8)',
    },
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    transition: transitions.create('transform', transitionsConfig),
    transformOrigin: 'top left',

    '$rootWithAnimations:hover &': {
      transform: 'translate(65px, -65px) scale(0.8)',
    },
  },

  stats: {
    transition: transitions.create('transform', transitionsConfig),

    '$rootWithAnimations:hover &': {
      transform: 'translateY(-55px)',
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
}));
