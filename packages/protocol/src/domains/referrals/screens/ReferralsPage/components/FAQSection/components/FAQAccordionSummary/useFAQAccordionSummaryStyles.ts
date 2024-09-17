import { accordionSummaryClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const name = 'FAQAccordionSummary';

export const useFAQAccordionSummaryStyles = makeStyles({ name })(theme => ({
  root: {
    padding: 0,
    minHeight: 'unset',

    backgroundColor: 'transparent',

    '&:hover': {
      [`.${accordionSummaryClasses.content}`]: {
        color: theme.palette.link.main,
      },
    },

    [`&.${accordionSummaryClasses.expanded}`]: {
      minHeight: 'unset',
    },
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing(3),

    margin: 0,

    color: theme.palette.text.primary,

    [`&.${accordionSummaryClasses.expanded}`]: {
      margin: 0,

      color: theme.palette.link.main,
    },

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
    },
  },
}));
