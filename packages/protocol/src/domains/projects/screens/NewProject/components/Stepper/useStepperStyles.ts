import { makeStyles } from 'tss-react/mui';
import { StepConnector, stepLabelClasses, styled } from '@mui/material';

export const useStepperStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  iconContainer: {
    display: 'none',
  },
  label: {
    marginRight: theme.spacing(2),
    color: theme.palette.grey[400],
    padding: theme.spacing(2),

    [`&.${stepLabelClasses.active}`]: {
      fontWeight: 600,
      color: theme.palette.primary.main,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },

    [`&.${stepLabelClasses.completed}`]: {
      color: theme.palette.grey[900],
    },
  },
  check: {
    color: theme.palette.grey[900],
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
  },
  step: {
    margin: theme.spacing(0, 0.5),
  },
}));

export const Connector = styled(StepConnector)(() => ({
  display: 'none',
}));
