import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useGlossaryTermStyles = makeStyles<Theme>(theme => ({
  root: {},
  quote: {
    fontSize: 20,
    paddingLeft: theme.spacing(3),
    position: 'relative',

    '&:before': {
      content: '""',
      width: 4,
      height: '100%',
      backgroundColor: '#EEA941',
      position: 'absolute',
      left: 0,
      top: 0,
    },
  },
  description: {
    fontSize: 16,
  },
  showAllBtn: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));
