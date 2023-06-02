import { useCallback } from 'react';
import {
  FormControl,
  Select,
  Typography,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import { useTypeSelectorStyles } from './useTypeSelectorStyles';
import { ChainType } from 'domains/chains/types';
import { useTypeSelector } from './hooks/useTypeSelector';
import { ISelectOption } from 'uiKit/Select';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';
import { useSelectorVisibility } from '../ChainSelector/useSelectorVisibility';

interface ITypeSelectorProps extends SelectMenuProps {
  chainType: ChainType;
  chainTypes: ISelectOption[];
  onTypeSelect: (id: ChainType) => void;
}

export const TypeSelector = ({
  chainType,
  chainTypes,
  onTypeSelect,
  menuProps,
  classNameMenuItem,
}: ITypeSelectorProps) => {
  const { classes, cx } = useTypeSelectorStyles();

  const { renderValue } = useTypeSelector(chainTypes);

  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const chainGroup = event.target.value as ChainType;

      onTypeSelect(chainGroup);
    },
    [onTypeSelect],
  );

  const selectProps = useSelectorVisibility();

  if (chainTypes.length <= 1) {
    return null;
  }

  return (
    <FormControl className={classes.form}>
      <Select
        inputProps={{ classes: classes.inputRoot }}
        value={chainType}
        renderValue={renderValue}
        onChange={onChange}
        classes={{ select: classes.select }}
        MenuProps={menuProps}
        {...selectProps}
      >
        {chainTypes.map(item => (
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