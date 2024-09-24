import { makeStyles } from 'tss-react/mui';

const name = 'FAQAccordion';

export const useFAQAccordionStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(4, 0),

    borderBottom: `1px solid ${theme.palette.divider}`,

    background: 'transparent',

    '&&': {
      borderRadius: 0,
    },

    '&::before': {
      display: 'none',
    },
  },
}));
