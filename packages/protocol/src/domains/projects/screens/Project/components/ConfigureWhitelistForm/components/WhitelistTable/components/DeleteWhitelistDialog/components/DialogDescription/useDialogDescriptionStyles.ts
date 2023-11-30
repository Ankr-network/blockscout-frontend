import { makeStyles } from 'tss-react/mui';

export const useDialogDescriptionStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(8),

    color: theme.palette.text.secondary,

    letterSpacing: '-0.01em',
    whiteSpace: 'pre-wrap',

    lineHeight: '140%',
  },
}));
