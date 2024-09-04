import { makeStyles } from 'tss-react/mui';

export const useProjectEndpointsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeframe: {
    marginLeft: 'auto',
    height: 28,

    '&&': {
      borderRadius: 10,
    },
  },
  tab: {
    height: 24,
    minHeight: 24,
  },
  chainsHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
