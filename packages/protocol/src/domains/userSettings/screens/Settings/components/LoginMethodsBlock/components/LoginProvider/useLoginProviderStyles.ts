import { makeStyles } from 'tss-react/mui';

export const useLoginProviderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(5, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,

    '&:first-of-type': {
      paddingTop: 0,
    },
  },
}));
