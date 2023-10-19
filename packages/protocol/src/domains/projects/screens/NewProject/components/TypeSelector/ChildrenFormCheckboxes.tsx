import { Box, FormControlLabel, Typography, Checkbox } from '@mui/material';

import { getCustomLabelForChainsCornerCases } from 'domains/projects/utils/getCustomLabelForChainsCornerCases';

import { NestedItemBase } from './hooks/useNestedChainItemsSelection';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';

interface IChildrenFormCheckboxesProps {
  nestedItems: NestedItemBase[];
  checkedItems: string[];
  handleChangeItem: (isChecked: boolean, chainId: string) => void;
}

export const ChildrenFormCheckboxes = ({
  nestedItems,
  checkedItems,
  handleChangeItem,
}: IChildrenFormCheckboxesProps) => {
  const { classes, cx } = useTypeSelectorStyles();

  return (
    <Box className={classes.childrenWrapper}>
      {nestedItems.map(item => (
        <FormControlLabel
          classes={{
            root: classes.formControlLabel,
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
