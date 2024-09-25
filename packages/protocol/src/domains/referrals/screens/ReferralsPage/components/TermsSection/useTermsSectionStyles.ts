import { makeStyles } from 'tss-react/mui';

const name = 'TermsSection';

export const useTermsSectionStyles = makeStyles({ name })(theme => ({
  list: {
    paddingInlineStart: theme.spacing(4),
  },
  listItem: {
    ul: {
      listStyleType: 'disc',
      paddingInlineStart: theme.spacing(4),
    },
  },
}));
