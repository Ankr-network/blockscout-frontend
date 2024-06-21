import { Chip as MuiChip } from '@mui/material';

import { useChipStyles } from './ChipStyles';

export interface ChipProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Chip = ({ className, label, onClick }: ChipProps) => {
  const { classes, cx } = useChipStyles();

  return (
    <MuiChip
      className={cx(classes.root, className)}
      label={label}
      onClick={onClick}
    />
  );
};
