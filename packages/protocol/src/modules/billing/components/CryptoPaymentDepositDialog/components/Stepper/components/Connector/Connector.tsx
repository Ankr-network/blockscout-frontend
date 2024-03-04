import { StepConnector, StepConnectorProps } from '@mui/material';

import { useConnectorStyles } from './useConnectorStyles';

export const Connector = (props: StepConnectorProps) => {
  const { classes } = useConnectorStyles();

  return <StepConnector {...props} classes={classes} />;
};
