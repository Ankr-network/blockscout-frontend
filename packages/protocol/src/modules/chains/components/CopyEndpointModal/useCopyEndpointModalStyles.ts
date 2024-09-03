import { makeStyles } from 'tss-react/mui';

export const useCopyEndpointModalStyles = makeStyles()(theme => ({
  endpointsDialog: {
    minWidth: 540,
  },
  chainSelectorControls: {
    marginTop: 0,
    marginBottom: theme.spacing(6),
  },
  copyEndpointButton: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
