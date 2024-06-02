import { makeStyles } from 'tss-react/mui';

export const useRequestsLabelStyles = makeStyles()(theme => ({
  requestsLabelRoot: {
    color: theme.palette.text.secondary,

    whiteSpace: 'nowrap',
  },
}));
