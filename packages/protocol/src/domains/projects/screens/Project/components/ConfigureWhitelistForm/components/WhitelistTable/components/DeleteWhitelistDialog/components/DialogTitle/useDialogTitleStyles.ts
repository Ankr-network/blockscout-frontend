import { makeStyles } from 'tss-react/mui';

export const useDialogTitleStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.primary,

    letterSpacing: '-0.03em',

    lineHeight: '110%',
  },
}));
