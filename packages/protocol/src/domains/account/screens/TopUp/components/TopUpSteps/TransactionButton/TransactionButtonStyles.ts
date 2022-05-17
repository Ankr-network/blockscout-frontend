import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    gap: 12,
  },
  copyToClip: {
    width: '100%',
    marginBottom: theme.spacing(5),

    '& h6': {
      lineHeight: 1.4,
    },
  },
  link: {
    minWidth: 40,
    height: 40,
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    background: theme.palette.background.default,

    '&:hover': {
      background: theme.palette.common.white,
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,

      '& $icon': {
        color: theme.palette.text.primary,
      },
    },

    '& span span': {
      margin: '0 !important',
    },
  },

  icon: {
    transition: 'color .3s',
  },
}));
