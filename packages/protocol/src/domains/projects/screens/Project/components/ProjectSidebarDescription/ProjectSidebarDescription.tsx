import { Typography } from '@mui/material';

import { useProjectSidebarDescriptionStyles } from './useProjectSidebarDescriptionStyles';

export interface ProjectSidebarDescriptionProps {
  children?: string;
  className?: string;
}

export const ProjectSidebarDescription = ({
  children,
  className,
}: ProjectSidebarDescriptionProps) => {
  const { classes, cx } = useProjectSidebarDescriptionStyles();

  return (
    <Typography
      className={cx(classes.root, className)}
      component="p"
      variant="body2"
    >
      {children}
    </Typography>
  );
};
