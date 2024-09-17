import { makeStyles } from 'tss-react/mui';

const name = 'TablePlaceholder';

export const useTablePlaceholderStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(4),
    maxWidth: 280,

    borderRadius: 12,

    border: `1px solid ${theme.palette.divider}`,
  },
  icon: {
    width: 28,
  },
  text: {
    marginTop: theme.spacing(1),

    textAlign: 'center',
    textWrap: 'wrap',

    color: theme.palette.text.secondary,
  },
  copyLinkButton: {
    marginTop: theme.spacing(2),
  },
}));
