import { useCallback } from 'react';
import {
  FormControl,
  Select,
  Typography,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ChainType } from '@ankr.com/chains-list';

import { ISelectOption } from 'uiKit/Select';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';

import { useTypeSelector } from './hooks/useTypeSelector';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';
import { useSelectorVisibility } from '../ChainSelector/useSelectorVisibility';

interface ITypeSelectorProps extends SelectMenuProps {
  chainType: ChainType;
  chainTypes: ISelectOption[];
  isMenuAlwaysVisible?: boolean;
  onTypeSelect: (id: ChainType) => void;
}

export const TypeSelector = ({
  chainType,
  chainTypes,
  classNameMenuItem,
  isMenuAlwaysVisible = false,
  menuProps,
  onTypeSelect,
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

  if (chainTypes.length <= 1 && !isMenuAlwaysVisible) {
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
