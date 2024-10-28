import { makeStyles } from 'tss-react/mui';

export const useEmailBlockStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    maxWidth: 424,
    height: 40,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2, 2, 2, 3),
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  email: {
    display: 'inline',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  icon: {
    color: theme.palette.grey[600],
    height: 24,
    width: 24,

    '& > path': {
      strokeWidth: 1.5,
    },
  },
}));
