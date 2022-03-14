import { makeStyles } from '@material-ui/core';

export const useFeatureLegacyItemStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),

    '&:hover': {
      boxShadow: '0px 9px 11px #D8DFEA, 0px 0px 4px #E1E5EC',
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
    transition: '0.2s all',
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
