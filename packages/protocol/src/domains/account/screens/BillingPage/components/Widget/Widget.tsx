import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { EditButton } from '../EditButton';
import { useWidgetStyles } from './WidgetStyles';

export interface WidgetProps {
  children: ReactNode;
  className: string;
  contentClassName?: string;
  actionsClassName?: string;
  hasEditButton?: boolean;
  onEdit?: () => void;
}

export const Widget = ({
  children,
  className,
  contentClassName,
  actionsClassName,
  hasEditButton = false,
  onEdit,
}: WidgetProps) => {
  const { classes, cx } = useWidgetStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <div className={cx(classes.content, contentClassName)}>{children}</div>
      <div className={cx(classes.actions, actionsClassName)}>
        {hasEditButton && <EditButton onClick={onEdit} />}
      </div>
    </Box>
  );
};
