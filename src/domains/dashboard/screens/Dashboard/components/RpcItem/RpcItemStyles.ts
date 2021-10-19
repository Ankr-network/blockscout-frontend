import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(3, 2),
  },
  right: {
    display: 'flex',
    width: '50%',
  },
  item: {
    flexGrow: 1,

    '&:not(:last-child)': {
      minWidth: `calc(50% - ${theme.spacing(2.5)}px)`,
      marginRight: theme.spacing(2.5),
    },
    '&:last-child': {
      minWidth: '50%',
    },
  },
  description: {
    display: 'flex',

    '& $descriptionItem': {
      marginRight: theme.spacing(2.5),
    },
  },
  descriptionItem: {},
}));
