import { makeStyles } from '@material-ui/core';

import { Seconds } from 'modules/common/types';

const transitionTime: Seconds = 0.3;

export const useFeatureLegacyItemStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    transition: `all ${transitionTime}s ease`,

    '&:hover': {
      boxShadow: '0px 9px 11px #D8DFEA, 0px 0px 4px #E1E5EC',
      transform: 'translateY(-5px)',
    },
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  statsButtonsWrapper: {
    height: 34,
    position: 'relative',
  },

  buttons: {
    position: 'absolute',
    top: 0,
    left: 0,
    transition: `all ${transitionTime}s`,
  },
  button: {
    height: 40,
    borderRadius: 16,
  },

  statLabel: {
    fontSize: 14,
    color: `${theme.palette.text.secondary}`,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  icon: {
    display: 'block',
    marginBottom: theme.spacing(1.5),
    fontSize: 64,
  },
}));
