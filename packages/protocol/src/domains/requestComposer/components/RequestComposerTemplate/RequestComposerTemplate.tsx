import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { RequestsHistory } from '../RequestsHistory';
import { useRequestComposerStyles } from './RequestComposerTemplateStyles';

export interface IRequestComposerProps {
  className?: string;
  hasRequestHistory?: boolean;
  header: ReactNode;
  logger: ReactNode;
  menu: ReactNode;
}

export const RequestComposerTemplate = ({
  className,
  hasRequestHistory,
  header,
  logger,
  menu,
}: IRequestComposerProps) => {
  const { classes, cx } = useRequestComposerStyles();

  return (
    <Box className={cx(classes.root, className)}>
      {header}
      <Box className={classes.container}>
        {menu}
        <div className={classes.right}>
          {logger}
          {hasRequestHistory && <RequestsHistory />}
        </div>
      </Box>
    </Box>
  );
};
