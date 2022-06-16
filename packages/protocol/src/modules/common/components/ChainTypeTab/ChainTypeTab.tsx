import React, { ReactNode } from 'react';

import { useStyles } from './ChainTypeStyles';

export interface ChainTypeTabProps {
  content: ReactNode;
  isSelected?: boolean;
}

export const ChainTypeTab = ({ content, isSelected }: ChainTypeTabProps) => {
  const classes = useStyles(!!isSelected);

  return <div className={classes.root}>{content}</div>;
};
