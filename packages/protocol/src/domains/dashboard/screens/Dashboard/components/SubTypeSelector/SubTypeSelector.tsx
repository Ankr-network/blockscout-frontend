import { useCallback } from 'react';
import {
  FormControl,
  Select,
  Typography,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ChainSubType } from '@ankr.com/chains-list';

import { ISelectOption } from 'uiKit/Select';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';

import { useSubTypeSelector } from './hooks/useSubTypeSelector';
import { useSubTypeSelectorStyles } from './useSubTypeSelectorStyles';
import { useSelectorVisibility } from '../ChainSelector/useSelectorVisibility';

interface ITypeSelectorProps extends SelectMenuProps {
  chainSubType: ChainSubType;
  chainSubTypes: ISelectOption[];
  onSubTypeSelect: (id: ChainSubType) => void;
}

export const SubTypeSelector = ({
  chainSubType,
  chainSubTypes,
  classNameMenuItem,
  menuProps,
  onSubTypeSelect,
}: ITypeSelectorProps) => {
  const { classes, cx } = useSubTypeSelectorStyles();

  const { renderValue } = useSubTypeSelector(chainSubTypes);

  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const chainGroup = event.target.value as ChainSubType;

      onSubTypeSelect(chainGroup);
    },
    [onSubTypeSelect],
  );

  const selectProps = useSelectorVisibility();

  if (chainSubTypes?.length <= 1) {
    return null;
  }

  return (
    <FormControl className={classes.form}>
      <Select
        inputProps={{ classes: classes.inputRoot }}
        value={chainSubType}
        renderValue={renderValue}
        onChange={onChange}
        classes={{ select: classes.select }}
        MenuProps={menuProps}
        {...selectProps}
      >
        {chainSubTypes.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
            className={cx(classes.menuItem, classNameMenuItem)}
          >
            <Typography variant="body2" noWrap>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
