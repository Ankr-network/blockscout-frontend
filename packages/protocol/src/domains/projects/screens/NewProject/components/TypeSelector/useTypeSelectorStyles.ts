import { makeStyles } from 'tss-react/mui';
import { accordionClasses } from '@mui/material';

export const useTypeSelectorStyles = makeStyles()(theme => ({
  accordion: {
    backgroundImage: 'none',
  },
  accordionSummary: {
    padding: 0,
    minHeight: 32,
    maxHeight: 32,

    [`&.${accordionClasses.expanded}`]: {
      minHeight: 32,
      maxHeight: 32,
    },
  },
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
    fontWeight: 400,
  },
  commonLabel: {
    fontWeight: 700,
  },
}));
