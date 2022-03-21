import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useBaseStyles, useSelectedStyles } from './TabTitleStyles';

export interface TabTitleProps {
  content: ReactNode;
  isSelected?: boolean;
}

export const TabTitle = ({ content, isSelected }: TabTitleProps) => {
  const baseClasses = useBaseStyles();
  const selectedClasess = useSelectedStyles();

  const className = classNames(baseClasses.root, {
    [selectedClasess.selected]: isSelected,
  });

  return <div className={className}>{content}</div>;
};
