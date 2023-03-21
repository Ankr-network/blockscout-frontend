import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { RequestsHistory } from '../RequestsHistory';
import { useRequestComposerStyles } from './RequestComposerTemplateStyles';
import { useRequestsHistory } from './hooks/useRequestsHistory';

export interface IRequestComposerProps {
  className?: string;
  hasRequestHistory?: boolean;
  header: ReactNode;
  logger: ReactNode;
  menu: ReactNode;
}

export const RequestComposerTemplate = ({
  className,
  hasRequestHistory = false,
  header,
  logger,
  menu,
}: IRequestComposerProps) => {
  const requestsHistoryProps = useRequestsHistory();
  const { isExpanded } = requestsHistoryProps;

  const { classes, cx } = useRequestComposerStyles({
    hasRequestHistory,
    isExpanded,
  });

  return (
    <Box className={cx(classes.root, className)}>
      {header}
      <Box className={classes.container}>
        {menu}
        <div className={classes.right}>
          {logger}
          {hasRequestHistory && <RequestsHistory {...requestsHistoryProps} />}
        </div>
      </Box>
    </Box>
  );
};
