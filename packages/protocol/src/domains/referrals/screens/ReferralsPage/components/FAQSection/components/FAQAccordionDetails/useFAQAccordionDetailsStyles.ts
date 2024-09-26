import { makeStyles } from 'tss-react/mui';

const name = 'FAQAccordionDetails';

export const useFAQAccordionDetailsStyles = makeStyles({ name })(theme => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 0, 0, 8),

    color: theme.palette.text.primary,

    ul: {
      margin: 0,
      paddingInlineStart: theme.spacing(4),
    },
  },
}));
