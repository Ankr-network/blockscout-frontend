import { Typography } from '@mui/material';

import { useProjectErrorStyles } from './useProjectErrorStyles';

export interface ProjectErrorProps {
  children: string;
  className?: string;
}

export const ProjectError = ({ children, className }: ProjectErrorProps) => {
  const { classes, cx } = useProjectErrorStyles();

  return (
    <Typography className={cx(classes.root, className)} variant="body3">
      {children}
    </Typography>
  );
};
