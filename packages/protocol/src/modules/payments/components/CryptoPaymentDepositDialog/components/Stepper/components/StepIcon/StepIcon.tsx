import { CircleCheck, Mark } from '@ankr.com/ui';
import { StepIconProps, Typography } from '@mui/material';

export const StepIcon = ({ completed, error, icon }: StepIconProps) => {
  if (error) {
    return <Mark color="error" size={32} />;
  }

  if (completed) {
    return <CircleCheck color="success" size={32} />;
  }

  return <Typography variant="subtitle3">{icon}</Typography>;
};
