import { makeStyles } from 'tss-react/mui';

export const useCopyEndpointModalStyles = makeStyles()(theme => ({
  endpointsDialog: {
    width: 680,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  chainSelectorControls: {
    marginTop: 0,
    marginBottom: theme.spacing(6),
  },
  copyEndpointButton: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  projectSelector: {
    marginBottom: theme.spacing(3),
    '&': {
      borderRadius: 11,
    },
    div: { boxShadow: 'none' },
  },
  projectTabContent: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: 150,
    overflow: 'hidden',
    lineHeight: '22px',
  },
}));
