import { makeStyles } from '@material-ui/core/styles';

export const useUnstakeStyles = makeStyles(theme => ({
  root: {
    '& form > div:nth-child(2)': {
      padding: theme.spacing(0, 0, 0, 0),
    },
  },

  liquidityPoolArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(-1.5, 0, 0, 0),
    padding: theme.spacing(0, 0, 0, 1),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },

  questionBtn: {
    margin: theme.spacing('-1px', 0, 0, '3px'),
  },
}));
