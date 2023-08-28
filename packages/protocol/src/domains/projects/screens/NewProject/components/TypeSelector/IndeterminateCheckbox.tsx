import { FormControlLabel, Checkbox, Box } from '@mui/material';

import { ProjectChainType } from 'domains/projects/types';
import { getCustomLabelForChainsCornerCases } from 'domains/projects/utils/getCustomLabelForChainsCornerCases';

import {
  NestedItemBase,
  useNestedChainItemsSelection,
} from './hooks/useNestedChainItemsSelection';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';

interface IndeterminateCheckboxProps {
  parentLabel: string;
  nestedItems: NestedItemBase[];
  chainType: ProjectChainType;
}

const IndeterminateCheckbox = ({
  parentLabel,
  nestedItems,
  chainType,
}: IndeterminateCheckboxProps) => {
  const {
    isParentIndeterminate,
    isParentChecked,
    onSelectParent,
    checkedItems,
    handleChangeItem,
  } = useNestedChainItemsSelection(nestedItems, chainType);

  const { classes } = useTypeSelectorStyles();

  const isVisibleNestedItemsList = nestedItems.length > 1;

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
            onChange={onSelectParent}
          />
        }
      />

      {/* Children */}
      {isVisibleNestedItemsList && (
        <Box className={classes.childrenWrapper}>
          {nestedItems.map(item => (
            <FormControlLabel
              classes={{
                root: classes.formControlLabel,
                label: classes.label,
              }}
              key={item.chainId}
              label={getCustomLabelForChainsCornerCases(item)}
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
      )}
    </div>
  );
};

export default IndeterminateCheckbox;
