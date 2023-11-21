import { Typography } from '@mui/material';

import { useProjectSidebarTitleStyles } from './useProjectSidebarTitleStyles';

export interface ProjectSidebarTitleProps {
  children?: string;
  className?: string;
}

export const ProjectSidebarTitle = ({
  children,
  className,
}: ProjectSidebarTitleProps) => {
  const { classes, cx } = useProjectSidebarTitleStyles();

  return (
    <Typography className={cx(classes.root, className)} variant="h6">
      {children}
    </Typography>
  );
};
