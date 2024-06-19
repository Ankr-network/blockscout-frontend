import { ChangeEvent, MouseEvent } from 'react';
import { FormControlLabel, Typography, Checkbox } from '@mui/material';

import { useTypeSelectorStyles } from './useTypeSelectorStyles';

interface IParentFormCheckboxProps {
  parentLabel: string;
  isParentIndeterminate: boolean;
  isParentChecked: boolean;
  onSelectParent: (event: ChangeEvent<HTMLInputElement>) => void;
}

const handleClickBubbling = (event: MouseEvent) => event.stopPropagation();

export const ParentFormCheckbox = ({
  isParentChecked,
  isParentIndeterminate,
  onSelectParent,
  parentLabel,
}: IParentFormCheckboxProps) => {
  const { classes, cx } = useTypeSelectorStyles();

  return (
    <FormControlLabel
      classes={{
        root: classes.formControlLabel,
        label: classes.label,
      }}
      label={
        <Typography
          variant="body2"
          className={cx(classes.label, classes.commonLabel)}
          onClick={handleClickBubbling}
        >
          {parentLabel}
        </Typography>
      }
      control={
        <Checkbox
          checked={isParentChecked}
          indeterminate={isParentIndeterminate}
          onChange={onSelectParent}
          onClick={handleClickBubbling}
        />
      }
    />
  );
};
