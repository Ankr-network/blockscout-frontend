import { makeStyles } from 'tss-react/mui';

export const useEndpointStyles = makeStyles()(theme => ({
  copyToClip: {
    flexGrow: 1,

    height: 40,

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 12,

    boxShadow: 'none',
  },
  copyToClipContent: {
    span: {
      color: theme.palette.text.primary,
    },
  },
}));
