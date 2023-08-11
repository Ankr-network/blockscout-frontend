import { FormControlLabel, Checkbox, Box } from '@mui/material';

import { ChainType } from 'domains/chains/types';

import {
  NestedItem,
  useNestedChainItemsSelection,
} from './hooks/useNestedChainItemsSelection';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';
import { getCustomLabelWithZetachainPrefix } from '../../utils/getCustomLabelWithZetachainPrefix';

interface IndeterminateCheckboxProps {
  parentLabel: string;
  nestedItems: NestedItem[];
  chainType: ChainType;
}

const IndeterminateCheckbox = ({
  parentLabel,
  nestedItems,
  chainType,
}: IndeterminateCheckboxProps) => {
  const {
    isParentIndeterminate,
    isParentChecked,
    handleParentOnChange,
    checkedItems,
    handleChangeItem,
  } = useNestedChainItemsSelection(nestedItems, chainType);

  const { classes } = useTypeSelectorStyles();

  return (
    <div className={classes.checkboxGroupRoot}>
      {/* Parent */}
      <FormControlLabel
        classes={{
          root: classes.formControlLabel,
          label: classes.label,
        }}
        label={parentLabel}
        control={
          <Checkbox
            indeterminate={isParentIndeterminate}
            checked={isParentChecked}
            onChange={handleParentOnChange}
          />
        }
      />

      {/* Children */}
      <Box className={classes.childrenWrapper}>
        {checkedItems &&
          nestedItems.map(item => (
            <FormControlLabel
              classes={{
                root: classes.formControlLabel,
                label: classes.label,
              }}
              key={item.chainId}
              label={getCustomLabelWithZetachainPrefix(item)}
              control={
                <Checkbox
                  checked={checkedItems.includes(item.chainId)}
                  onChange={event =>
                    handleChangeItem(event.target.checked, item.chainId)
                  }
                />
              }
            />
          ))}
      </Box>
    </div>
  );
};

export default IndeterminateCheckbox;
