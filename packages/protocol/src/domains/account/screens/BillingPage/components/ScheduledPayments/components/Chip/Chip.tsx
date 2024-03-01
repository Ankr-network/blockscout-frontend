import { Chip as MuiChip } from '@mui/material';

import { useChipStyles } from './ChipStyles';

export interface ChipProps {
  label: string;
  onClick?: () => void;
}

export const Chip = ({ label, onClick }: ChipProps) => {
  const { classes } = useChipStyles();

  return <MuiChip className={classes.root} label={label} onClick={onClick} />;
};
