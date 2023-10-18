import { makeStyles } from 'tss-react/mui';

export const useAddToWhitelistDialogStyles = makeStyles()(theme => ({
  root: {
    width: 520,
  },
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    lineHeight: '22.4px',
  },
}));
