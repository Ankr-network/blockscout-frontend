import { makeStyles } from 'tss-react/mui';

export const useCardListStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    marginBottom: theme.spacing(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    marginBottom: theme.spacing(4),
  },
  listItem: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,

    '&:last-of-type': {
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
    },
  },
}));
