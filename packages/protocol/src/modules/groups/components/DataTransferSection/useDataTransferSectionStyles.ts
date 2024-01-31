import { makeStyles } from 'tss-react/mui';

export const useDataTransferSectionStyles = makeStyles()(theme => ({
  dataTransferSwitch: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  dataTransferInput: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: '100%',
    justifyContent: 'space-between',
  },
  switchTitle: {
    marginRight: theme.spacing(2),
    '.arrow': {
      position: 'relative',
      top: '-1px',
    },
  },
  switcherRoot: {
    gap: theme.spacing(2),
    minWidth: 72,
  },
  switchTrack: {
    backgroundColor: theme.palette.background.default,
  },
  switchTrackEnabled: {
    backgroundColor: theme.palette.primary.main,
  },
  label: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },
}));
