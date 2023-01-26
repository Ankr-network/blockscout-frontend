import { useCallback } from 'react';
import { IconButton } from '@mui/material';

import { useTable } from '../../utils';
import { ArrowDown } from '@ankr.com/ui';
import { useStyles } from './useStyles';

export const VirtualTableExpander = ({ index }: { index: number }) => {
  const { classes, cx } = useStyles();
  const { expandedRow, toggleExpand } = useTable();

  const handleExpand = useCallback(() => {
    toggleExpand(index);
  }, [index, toggleExpand]);

  return (
    <IconButton
      className={cx(classes.icon, {
        [classes.expanded]: expandedRow === index,
      })}
      onClick={handleExpand}
    >
      <ArrowDown />
    </IconButton>
  );
};
