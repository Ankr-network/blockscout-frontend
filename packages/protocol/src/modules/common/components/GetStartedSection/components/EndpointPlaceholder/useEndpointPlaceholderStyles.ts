import { makeStyles } from 'tss-react/mui';

export const useEndpointPlaceholderStyles = makeStyles()(theme => ({
  endpointPlaceholderRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  endpointPlaceholderContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    minHeight: 36,
    height: 40,
    borderRadius: theme.spacing(3.5),
    border: `2px solid transparent`,
    transition: 'border 0.3s, background-color 0.3s',

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,
    },
  },
  placeholderContent: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
  endpointPlaceholderLockIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  copyIcon: {
    color: theme.palette.text.secondary,
    marginLeft: 'auto',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
}));
