import { ChangeEvent, MouseEvent, useCallback } from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

import { useTreeStyles } from 'modules/common/styles/useTreeStyles';

import { useCheckboxStyles } from './useCheckboxStyles';

export interface CheckboxProps {
  hasBorderBottom?: boolean;
  hasMarginTop?: boolean;
  hasPadding?: boolean;
  hasTreeView?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  label: string;
  onChange?: (isChecked: boolean) => void;
}

const handleClickBubbling = (event: MouseEvent) => event.stopPropagation();

export const Checkbox = ({
  hasBorderBottom = false,
  hasMarginTop = false,
  hasPadding = false,
  hasTreeView = false,
  isChecked,
  isDisabled,
  isIndeterminate,
  label,
  onChange,
}: CheckboxProps) => {
  const { classes } = useCheckboxStyles({
    hasBorderBottom,
    hasPadding,
    hasMarginTop,
  });

  const { classes: classesTree, cx } = useTreeStyles();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked);
    },
    [onChange],
  );

  return (
    <FormControlLabel
      classes={{
        root: cx(classes.checkboxRoot, { [classesTree.treeItem]: hasTreeView }),
        label: classes.checkboxLabel,
      }}
      label={
        <Typography
          className={classes.labelWrapper}
          onClick={handleClickBubbling}
          variant="body2"
        >
          {label}
        </Typography>
      }
      control={
        <MuiCheckbox
          checked={isChecked}
          disabled={isDisabled}
          indeterminate={isIndeterminate}
          onChange={handleChange}
          onClick={handleClickBubbling}
        />
      }
    />
  );
};
