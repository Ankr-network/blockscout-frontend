import { makeStyles } from 'tss-react/mui';

export const useTypeSelectorStyles = makeStyles()(theme => ({
  form: {
    width: '100%',
  },
  checkboxGroupRoot: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3, 0),
  },
  childrenWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(5),
  },
  formControlLabel: {
    padding: theme.spacing(1, 0),
  },
  label: {
    paddingLeft: theme.spacing(1.5),
    fontSize: 16,
  },
}));
