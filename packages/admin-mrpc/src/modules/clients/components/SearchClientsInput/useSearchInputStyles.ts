import { makeStyles } from '@material-ui/core';

const INPUT_WIDTH = 250;

export const useSearchInputStyles = makeStyles({
  root: {
    marginRight: 20,
  },
  input: {
    width: INPUT_WIDTH,
    height: 44,
  },
  clientsList: {
    position: 'absolute',
    width: INPUT_WIDTH,
    padding: 0,
    zIndex: 99,
    maxHeight: 200,
    overflow: 'auto',
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  },
  clientItem: {
    listStyle: 'none',
  },
  clientButton: {
    textAlign: 'left',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
});
