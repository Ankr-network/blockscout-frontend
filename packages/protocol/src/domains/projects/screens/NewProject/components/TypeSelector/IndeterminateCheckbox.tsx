import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';

import { ProjectChainType } from 'domains/projects/types';

import {
  NestedItemBase,
  useNestedChainItemsSelection,
} from './hooks/useNestedChainItemsSelection';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';
import { ParentFormCheckbox } from './ParentFormCheckbox';
import { ChildrenFormCheckboxes } from './ChildrenFormCheckboxes';

interface IndeterminateCheckboxProps {
  parentLabel: string;
  nestedItems: NestedItemBase[];
  chainType: ProjectChainType;
}

const IndeterminateCheckbox = ({
  chainType,
  nestedItems,
  parentLabel,
}: IndeterminateCheckboxProps) => {
  const {
    checkedItems,
    handleChangeItem,
    isParentChecked,
    isParentIndeterminate,
    onSelectParent,
  } = useNestedChainItemsSelection(nestedItems, chainType);

  const { classes } = useTypeSelectorStyles();

  const isVisibleNestedItemsList = nestedItems.length > 1;

  return (
    <div className={classes.checkboxGroupRoot}>
      {isVisibleNestedItemsList ? (
        <Accordion className={classes.accordion}>
          <AccordionSummary
            className={classes.accordionSummary}
            expandIcon={<ArrowDown />}
          >
            <ParentFormCheckbox
              parentLabel={parentLabel}
              isParentIndeterminate={isParentIndeterminate}
              isParentChecked={isParentChecked}
              onSelectParent={onSelectParent}
            />
          </AccordionSummary>

          <AccordionDetails>
            <ChildrenFormCheckboxes
              nestedItems={nestedItems}
              checkedItems={checkedItems}
              handleChangeItem={handleChangeItem}
            />
          </AccordionDetails>
        </Accordion>
      ) : (
        <ParentFormCheckbox
          parentLabel={parentLabel}
          isParentIndeterminate={isParentIndeterminate}
          isParentChecked={isParentChecked}
          onSelectParent={onSelectParent}
        />
      )}
    </div>
  );
};

export default IndeterminateCheckbox;
