import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { IWidgetProps, Widget } from '../Widget';
import { useSummaryWidgetStyles } from './useSummaryWidgetStyles';

export interface ISummaryWidgetProps extends IWidgetProps {
  actionButton?: ReactNode;
  title: string;
}

export const SummaryWidget = ({
  actionButton,
  children,
  className,
  title,
}: ISummaryWidgetProps) => {
  const isMobile = useIsSMDown();
  const [headerButton, footerButton] = isMobile
    ? [null, actionButton]
    : [actionButton, null];

  const { classes, cx } = useSummaryWidgetStyles();

  return (
    <Widget className={cx(classes.root, className)}>
      <div className={classes.header}>
        <Typography variant="subtitle2">{title}</Typography>
        {headerButton}
      </div>
      {children}
      {footerButton}
    </Widget>
  );
};
