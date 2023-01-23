import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { useRequestComposerStyles } from './RequestComposerTemplateStyles';

export interface IRequestComposerProps {
  header: ReactNode;
  menu: ReactNode;
  logger: ReactNode;
  className?: string;
}

export const RequestComposerTemplate = ({
  header,
  menu,
  logger,
  className,
}: IRequestComposerProps) => {
  const { classes, cx } = useRequestComposerStyles();

  return (
    <Box className={cx(classes.root, className)}>
      {header}
      <Box className={classes.container}>
        {menu}
        {logger}
      </Box>
    </Box>
  );
};
