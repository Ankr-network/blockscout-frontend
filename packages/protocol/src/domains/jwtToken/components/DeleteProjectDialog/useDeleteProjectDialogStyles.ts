import { makeStyles } from 'tss-react/mui';

export const useDeleteProjectDialogStyles = makeStyles()(theme => ({
  title: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 35,
    lineHeight: 1.15,
    letterSpacing: '-0.04em',
    marginBottom: 0,
    padding: theme.spacing(2.5, 14, 0, 14),
    position: 'relative',
    '& button': {
      top: 0,
      right: 0,
    },
  },
  info: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 400,
    margin: theme.spacing(7.5, 0),
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  main: {
    marginTop: theme.spacing(10),
  },
}));
