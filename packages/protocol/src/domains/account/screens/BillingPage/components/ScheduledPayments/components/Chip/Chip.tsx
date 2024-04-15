import { Chip as MuiChip } from '@mui/material';

import { useChipStyles } from './ChipStyles';

export interface ChipProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Chip = ({ label, onClick, className }: ChipProps) => {
  const { cx, classes } = useChipStyles();

  return (
    <MuiChip
      className={cx(classes.root, className)}
      label={label}
      onClick={onClick}
    />
  );
};
