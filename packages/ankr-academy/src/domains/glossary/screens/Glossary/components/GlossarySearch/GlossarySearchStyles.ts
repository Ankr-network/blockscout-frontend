import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const shadow =
  '0px 0px 5px rgba(0, 0, 0, 0.15), 0px 0px 20px rgba(24, 48, 104, 0.1)';

export const useGlossarySearchStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    paddingRight: theme.spacing(1),
    border: 'none',
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    fontSize: 17,
  },
  menuButton: {
    backgroundColor: '#F2F5FA',
    color: theme.palette.text.primary,
    borderRadius: 16,
  },
  menuButtonActive: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  menuPaper: {
    maxWidth: 277,
    width: 277,
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: shadow,
  },
  menuList: {
    padding: 0,
  },
  letterBtn: {
    padding: 10,
    minWidth: 'auto',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    color: 'black',
  },
}));
