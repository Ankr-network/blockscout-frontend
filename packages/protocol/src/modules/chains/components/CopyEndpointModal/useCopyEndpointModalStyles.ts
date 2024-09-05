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
    maxWidth: '100%',
    marginBottom: theme.spacing(3),
    '&': {
      borderRadius: 11,
    },
    div: {
      boxShadow: 'none',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  projectTabContent: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    overflow: 'hidden',
    lineHeight: '22px',
  },
}));
