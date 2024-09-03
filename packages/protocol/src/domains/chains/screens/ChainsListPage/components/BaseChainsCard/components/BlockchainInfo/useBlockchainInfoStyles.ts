import { makeStyles } from 'tss-react/mui';

export const useBlockchainInfoStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(3),

    width: '100%',
  },
  icon: {
    width: 48,
    height: 48,
  },
  info: {
    overflow: 'hidden',
  },
  name: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1),

    color: theme.palette.text.primary,

    wordBreak: 'break-word',
  },
  premiumLabel: {
    display: 'flex',
    flexShrink: 0,

    marginTop: 3.5,
  },
  coin: {
    display: 'block',

    color: theme.palette.text.secondary,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  subinfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  separator: {
    '&:after': {
      content: "' • '",
      color: theme.palette.text.secondary,
    },
  },
  blockbook: {
    borderBottom: `1px dashed ${theme.palette.primary.main}`,

    '&&': {
      color: theme.palette.primary.main,
    },
  },
}));
