import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCheckboxStyles = makeStyles<Theme>(theme => ({
  labelRoot: {
    alignItems: 'flex-start',

    '& > span:first-child': {
      margin: '4px 0 0 2px',
      padding: 0,
      transform: 'none',
    },
  },
}));
