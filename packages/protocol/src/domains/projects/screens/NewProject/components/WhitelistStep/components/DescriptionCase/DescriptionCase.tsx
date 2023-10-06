import { Check } from '@ankr.com/ui';
import { Typography } from '@mui/material';

import { useDescriptionCaseStyles } from './useDescriptionCaseStyles';

interface IDescriptionCaseProps {
  text: string;
}

export const DescriptionCase = ({ text }: IDescriptionCaseProps) => {
  const { classes } = useDescriptionCaseStyles();

  return (
    <div className={classes.root}>
      <Check color="success" />

      <Typography variant="body2">{text}</Typography>
    </div>
  );
};
