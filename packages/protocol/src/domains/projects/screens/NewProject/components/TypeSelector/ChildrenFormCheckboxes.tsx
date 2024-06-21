import { Box, FormControlLabel, Typography, Checkbox } from '@mui/material';

import { getCustomLabelForChainsCornerCases } from 'domains/projects/utils/getCustomLabelForChainsCornerCases';
import { useTreeStyles } from 'modules/common/styles/useTreeStyles';

import { NestedItemBase } from './hooks/useNestedChainItemsSelection';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';

interface IChildrenFormCheckboxesProps {
  nestedItems: NestedItemBase[];
  checkedItems: string[];
  handleChangeItem: (isChecked: boolean, chainId: string) => void;
}

export const ChildrenFormCheckboxes = ({
  checkedItems,
  handleChangeItem,
  nestedItems,
}: IChildrenFormCheckboxesProps) => {
  const { classes, cx } = useTypeSelectorStyles();
  const { classes: classesTree } = useTreeStyles();

  return (
    <Box className={cx(classes.childrenWrapper, classesTree.treeWrapper)}>
      {nestedItems.map(item => (
        <FormControlLabel
          classes={{
            root: cx(classes.formControlLabel, classesTree.treeItem),
            label: classes.label,
          }}
          key={item.chainId}
          label={
            <Typography
              variant="body2"
              className={cx(classes.label, classes.commonLabel)}
            >
              {getCustomLabelForChainsCornerCases(item)}
            </Typography>
          }
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
  );
};
