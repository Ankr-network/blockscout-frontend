import { makeStyles } from '@material-ui/core/styles';

export const useCheckboxStyles = makeStyles(() => ({
  labelRoot: {
    alignItems: 'flex-start',

    '& > span:first-child': {
      margin: '4px 0 0 2px',
      padding: 0,
      transform: 'none',
    },
  },
}));
