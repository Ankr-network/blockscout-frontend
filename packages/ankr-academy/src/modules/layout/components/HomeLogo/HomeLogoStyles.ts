import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useHomeLogoStyles = makeStyles<Theme>(theme => ({
  homeWrap: {
    display: 'flex',
  },

  home: {
    justifyContent: 'flex-start',
  },

  homeIcon: {
    width: 96,
    height: 'auto',
    color: theme.palette.primary.main,
  },
}));
