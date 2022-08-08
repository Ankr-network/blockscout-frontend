import React from 'react';
import { Button } from '@material-ui/core';

import { useChainItemTabStyles } from './ChainItemTabStyles';

export interface ChainItemTabProps {
  isSelected: boolean;
  label: string;
}

export const ChainItemTab = ({ isSelected, label }: ChainItemTabProps) => {
  const classes = useChainItemTabStyles(isSelected);

  return (
    <Button className={classes.chainItemTab} variant="outlined">
      {label}
    </Button>
  );
};
