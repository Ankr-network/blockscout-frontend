import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  link: {
    padding: 0,
    height: 44,

    '&:hover ': {
      background: '#F2F5FA',

      '& $icon': {
        fill: theme.palette.primary.main,
      },
    },
  },
  icon: {
    width: 14,
    transition: '0.2s all',
    fill: theme.palette.grey[400],
  },
}));
