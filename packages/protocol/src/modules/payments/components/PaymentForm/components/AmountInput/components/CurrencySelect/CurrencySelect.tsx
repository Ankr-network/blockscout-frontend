import { useCallback } from 'react';
import { Select } from '@ankr.com/ui';
import { FormControl, MenuItem, SelectChangeEvent } from '@mui/material';

import { ECurrency } from 'modules/payments/types';

import { CurrencyItem } from '../CurrencyItem';
import { ISelectStablecoinOption } from '../../const';
import { getStablecoinIcon } from '../../utils/getStablecoinIcon';
import { useCurrencySelectStyles } from './useCurrencySelectStyles';

export interface ICurrencySelectProps {
  activeCurrency: ECurrency;
  changeCurrency: (currency: ECurrency) => void;
  options: ISelectStablecoinOption[];
}

export const CurrencySelect = ({
  activeCurrency,
  changeCurrency,
  options,
}: ICurrencySelectProps) => {
  const { classes } = useCurrencySelectStyles();

  const handleChangeCurrency = useCallback(
    (event: SelectChangeEvent<ECurrency>) => {
      changeCurrency(event.target.value as ECurrency);
    },
    [changeCurrency],
  );

  const renderValue = useCallback((value: ECurrency) => {
    return getStablecoinIcon(value);
  }, []);

  return (
    <FormControl className={classes.root}>
      <Select
        value={activeCurrency}
        renderValue={renderValue}
        size="small"
        onChange={handleChangeCurrency}
        classes={{
          root: classes.selectRoot,
          select: classes.select,
        }}
        inputProps={{ classes: classes.inputRoot }}
        MenuProps={{
          classes: {
            paper: classes.menuPaper,
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            className={classes.menuItem}
          >
            <CurrencyItem
              currency={option.value}
              isActive={option.value === activeCurrency}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
