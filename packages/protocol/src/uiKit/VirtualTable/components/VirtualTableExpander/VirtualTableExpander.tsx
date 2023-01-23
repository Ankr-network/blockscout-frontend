import { useCallback } from 'react';
import { IconButton } from '@mui/material';

import { useTable } from '../../utils';
import { ReactComponent as ArrowDownIcon } from '../../../Icons/arrowDown.svg';
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
      <ArrowDownIcon />
    </IconButton>
  );
};
