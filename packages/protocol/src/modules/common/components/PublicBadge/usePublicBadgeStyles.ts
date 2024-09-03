import { makeStyles } from 'tss-react/mui';

export const usePublicBadgeStyles = makeStyles()(theme => ({
  publicBadge: {
    height: 24,
    padding: theme.spacing(0.5, 2),
    borderRadius: 8,
    pointerEvents: 'none',
    span: { color: theme.palette.common.white },

    '&&': {
      backgroundColor: '#82899A',
    },
  },
}));
