import { makeStyles } from 'tss-react/mui';

const name = 'TablePlaceholder';

export const useTablePlaceholderStyles = makeStyles({ name })(theme => ({
  copyLinkButton: {
    marginTop: theme.spacing(2),
  },
}));
