import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import { useProjectErrorStyles } from './useProjectErrorStyles';

export interface ProjectErrorProps {
  children: string;
  className?: string;
}

export const ProjectError = ({ children, className }: ProjectErrorProps) => {
  const { classes, cx } = useProjectErrorStyles();

  return (
    <Typography
      className={cx(classes.root, className)}
      variant={'body3' as Variant}
    >
      {children}
    </Typography>
  );
};
