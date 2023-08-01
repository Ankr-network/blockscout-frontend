import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { EditButton } from '../EditButton';
import { TopUpButton } from '../TopUpButton';
import { useWidgetStyles } from './WidgetStyles';

export interface WidgetProps {
  children: ReactNode;
  className: string;
  contentClassName?: string;
  hasEditButton?: boolean;
  hasTopUpButton?: boolean;
  onEdit?: () => void;
  onTopUp?: () => void;
}

export const Widget = ({
  children,
  className,
  contentClassName,
  hasEditButton = false,
  hasTopUpButton = false,
  onEdit,
  onTopUp,
}: WidgetProps) => {
  const { classes, cx } = useWidgetStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <div className={cx(classes.content, contentClassName)}>{children}</div>
      <div className={classes.actions}>
        {hasTopUpButton && <TopUpButton onClick={onTopUp} />}
        {hasEditButton && <EditButton onClick={onEdit} />}
      </div>
    </Box>
  );
};
