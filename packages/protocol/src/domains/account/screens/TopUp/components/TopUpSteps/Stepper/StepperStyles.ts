import { StepConnector, stepConnectorClasses, styled } from '@mui/material';

import { stepLineColor } from 'uiKit/Theme/themeUtils';

export const NormalConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active} span,  &.${stepConnectorClasses.completed} span`]:
    {
      backgroundColor: theme.palette.primary.main,
    },
}));

export const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active} span`]: {
    backgroundImage: stepLineColor,
  },

  [`&.${stepConnectorClasses.completed} span`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));
