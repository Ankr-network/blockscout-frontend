import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { useTable } from '../../utils';
import { ReactComponent as ArrowDownIcon } from '../../../../icons/arrow-down.svg';
import { useStyles } from './useStyles';
import { useCallback } from 'react';

export const VirtualTableExpander = ({ index }: { index: number }) => {
  const classes = useStyles();
  const { expandedRow, toggleExpand } = useTable();

  const handleExpand = useCallback(() => {
    toggleExpand(index);
  }, [index, toggleExpand]);

  return (
    <IconButton
      className={classNames(classes.icon, {
        [classes.expanded]: expandedRow === index,
      })}
      onClick={handleExpand}
    >
      <ArrowDownIcon />
    </IconButton>
  );
};
