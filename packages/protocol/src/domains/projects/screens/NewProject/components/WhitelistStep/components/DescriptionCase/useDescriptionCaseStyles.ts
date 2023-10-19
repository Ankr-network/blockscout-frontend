import { makeStyles } from 'tss-react/mui';

export const useDescriptionCaseStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '20px 1fr',
    columnGap: theme.spacing(2),

    marginBottom: theme.spacing(1),

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
}));
