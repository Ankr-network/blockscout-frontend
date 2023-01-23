import { StepConnector, stepConnectorClasses, styled } from '@mui/material';

export const NormalConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active} span,  &.${stepConnectorClasses.completed} span`]:
    {
      backgroundColor: theme.palette.primary.main,
    },
}));

export const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active} span`]: {
    backgroundImage: 'linear-gradient(270deg, #EEA941 0%, #356DF3 100%)',
  },

  [`&.${stepConnectorClasses.completed} span`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));
