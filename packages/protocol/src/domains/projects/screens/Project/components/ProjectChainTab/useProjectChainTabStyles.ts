import { makeStyles } from 'tss-react/mui';

export const useProjectChainTabStyles = makeStyles()(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',

    padding: theme.spacing(2.5, 2),

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    backgroundColor: theme.palette.grey['100'],

    cursor: 'pointer',
  },
  isSelected: {
    backgroundColor: theme.palette.background.paper,
  },

  title: {
    textTransform: 'capitalize',
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(1),
  },
}));
