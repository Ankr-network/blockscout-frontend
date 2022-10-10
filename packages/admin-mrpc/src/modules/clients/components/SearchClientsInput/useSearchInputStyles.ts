import { makeStyles, Theme } from '@material-ui/core/styles';

const INPUT_WIDTH = 250;

export const useSearchInputStyles = makeStyles((theme: Theme) => ({
  root: {},
  input: {
    width: INPUT_WIDTH,
    height: 44,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(1),
    borderRadius: 16,
  },
  clientsList: {
    position: 'absolute',
    width: INPUT_WIDTH,
    padding: 0,
    zIndex: 99,
    maxHeight: 200,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  },
  clientItem: {
    listStyle: 'none',
  },
  clientButton: {
    textAlign: 'left',
    width: '100%',
    justifyContent: 'flex-start',
    textTransform: 'none',
    borderRadius: 0,
  },
}));
