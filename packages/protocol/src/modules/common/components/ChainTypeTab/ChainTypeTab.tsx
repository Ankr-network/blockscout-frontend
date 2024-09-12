import { ReactNode } from 'react';

import { useStyles } from './ChainTypeStyles';

export interface ChainTypeTabProps {
  className?: string;
  content: ReactNode;
  isSelected?: boolean;
}

export const ChainTypeTab = ({
  className,
  content,
  isSelected,
}: ChainTypeTabProps) => {
  const { classes, cx } = useStyles(!!isSelected);

  return <div className={cx(classes.root, className)}>{content}</div>;
};
