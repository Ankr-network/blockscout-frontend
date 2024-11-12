import { makeStyles } from 'tss-react/mui';

const name = 'ProjectActions';

export const useProjectActionsStyles = makeStyles({ name })(theme => ({
  root: {
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  skeleton: {
    display: 'inline-block',
  },
  codeExampleButton: {
    padding: 0,
    height: 30,
    minHeight: 30,
    marginLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },
}));
