import { makeStyles } from 'tss-react/mui';

export const useAssetsDialogStyles = makeStyles()(theme => ({
  paperRoot: {
    maxWidth: 600,
  },
  description: {
    maxWidth: '90%',

    '& a': {
      color: theme.palette.text.secondary,
    },
  },
  link: {
    '&&': {
      color: theme.palette.link.main,

      textDecoration: 'underline',
      textUnderlineOffset: 3,
    },
  },
}));
