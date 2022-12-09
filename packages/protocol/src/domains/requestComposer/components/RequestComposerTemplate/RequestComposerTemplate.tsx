import { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames';

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
  const classes = useRequestComposerStyles();

  return (
    <Box className={classNames(classes.root, className)}>
      {header}
      <Box className={classes.container}>
        {menu}
        {logger}
      </Box>
    </Box>
  );
};
