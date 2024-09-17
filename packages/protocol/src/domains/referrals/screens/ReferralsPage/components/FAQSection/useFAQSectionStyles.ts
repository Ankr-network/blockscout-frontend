import { makeStyles } from 'tss-react/mui';

const name = 'FAQSection';

export const useFAQSectionStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2, 7.5),

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    },
  },
}));
