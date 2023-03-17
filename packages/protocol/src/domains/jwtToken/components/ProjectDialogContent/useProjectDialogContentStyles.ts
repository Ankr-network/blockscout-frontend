import { makeStyles } from 'tss-react/mui';

export const useProjectDialogContentStyles = makeStyles()(theme => ({
  title: {
    color: theme.palette.text.primary,
    fontSize: 35,
    lineHeight: '40.25px',
    fontWeight: 700,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'flex-start',
  },
  content: {
    marginTop: theme.spacing(11),
  },
  info: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '28px',
    margin: theme.spacing(7.5, 0),
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  success: {
    marginTop: theme.spacing(10),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  name: {
    color: theme.palette.text.secondary,
  },
  value: {
    color: theme.palette.text.primary,
  },
  button: {
    marginTop: theme.spacing(5),
  },
}));
