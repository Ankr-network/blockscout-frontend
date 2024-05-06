import { useCallback } from 'react';
import { Select } from '@ankr.com/ui';
import { FormControl, MenuItem, SelectChangeEvent } from '@mui/material';

import { ECurrency } from 'modules/billing/types';

import { CurrencyItem } from './CurrencyItem';
import { useCurrencySelectStyles } from './useCurrencySelectStyles';
import { getStablecoinIcon } from '../../utils/getStablecoinIcon';
import { ISelectStablecoinOption } from '../../const';

interface ICurrencySelectProps {
  activeCurrency: ECurrency;
  options: ISelectStablecoinOption[];
  changeCurrency: (currency: ECurrency) => void;
}

export const CurrencySelect = ({
  activeCurrency,
  options,
  changeCurrency,
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
    <FormControl className={classes.formRoot}>
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
