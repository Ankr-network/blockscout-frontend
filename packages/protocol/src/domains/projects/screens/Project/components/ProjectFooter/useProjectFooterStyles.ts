import { makeStyles } from 'tss-react/mui';

export const useProjectFooterStyles = makeStyles()(theme => ({
  title: {
    display: 'flex',
    marginBottom: theme.spacing(5),
    color: theme.palette.text.primary,
  },
  contentWrapper: {
    display: 'flex',
    gap: theme.spacing(8),
  },
  paperBlock: {
    width: '50%',
  },
  link: {
    '&&': {
      padding: 0,
    },
    minWidth: 'auto',
    fontWeight: 500,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  linkItem: {
    color: theme.palette.text.primary,
    fontSize: 12,
  },
  learnMore: {
    height: 'auto',
    minHeight: 'auto',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  externalLinkIcon: {},
}));
