import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { ISelectOption } from 'uiKit/Select';
import { Chain, ChainID } from 'modules/chains/types';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';
import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';

import { useChainSelectorStyles } from './useChainSelectorStyles';
import { useSelectorVisibility } from './useSelectorVisibility';

interface IChainSelectorProps extends SelectMenuProps {
  selectedChainId: ChainID;
  handleChange: (event: SelectChangeEvent<ChainID>) => void;
  renderValue: (value: ChainID) => JSX.Element;
  options: ISelectOption[];
  chains: Chain[];
}

export const ChainSelector = ({
  selectedChainId,
  handleChange,
  renderValue,
  options,
  menuProps,
  classNameMenuItem,
  chains,
}: IChainSelectorProps) => {
  const { classes } = useChainSelectorStyles();

  const selectProps = useSelectorVisibility();

  return (
    <div className={classes.root}>
      <FormControl className={classes.form}>
        <Select
          inputProps={{
            classes: classes.inputRoot,
          }}
          MenuProps={menuProps}
          value={selectedChainId}
          onChange={handleChange}
          renderValue={renderValue}
          classes={{
            select: classes.select,
          }}
          displayEmpty
          {...selectProps}
        >
          {options.map(item => {
            const currentChain = chains.find(({ id }) => id === item.value);

            return (
              <MenuItem
                key={item.value}
                className={classNameMenuItem}
                value={item.value}
              >
                <>
                  {currentChain && (
                    <ChainLogo
                      className={classes.iconChain}
                      chain={currentChain}
                    />
                  )}
                  <Typography
                    variant="body2"
                    className={classes.menuItem}
                    noWrap
                  >
                    {item.label}
                  </Typography>
                </>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
