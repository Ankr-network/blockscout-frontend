import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCostButtonStyles = makeStyles<Theme>(theme => ({
  costButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: theme.spacing(6),
    minWidth: 'unset',
    height: theme.spacing(6),
    padding: 0,

    border: `${theme.spacing(0.25)}px solid ${
      theme.palette.background.default
    }`,
    borderRadius: theme.spacing(2.25),

    transition: 'color .3s, background-color .3s, box-shadow .3s',
  },
}));
