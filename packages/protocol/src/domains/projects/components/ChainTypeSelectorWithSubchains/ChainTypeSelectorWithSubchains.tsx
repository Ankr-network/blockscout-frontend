import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material';

import { useTreeStyles } from 'modules/common/styles/useTreeStyles';

import { useChainTypeSelectorWithSubchainsStyles } from './useChainTypeSelectorWithSubchainsStyles';
import {
  IChainTypeSelectorProps,
  useChainTypeSelectorWithSubchains,
} from './useChainTypeSelectorWithSubchains';
import { SubchainSelector } from './SubchainSelector';

export const ChainTypeSelectorWithSubchains = ({
  chain,
  endpoints,
  hasPremiumColor,
  selectedChainPaths,
  setSelectedChainPaths,
  subchains,
  typeName,
}: IChainTypeSelectorProps) => {
  const {
    allPaths,
    handleChangeChild,
    handleChangeParent,
    isParentChecked,
    isParentIndeterminate,
  } = useChainTypeSelectorWithSubchains({
    chain,
    endpoints,
    hasPremiumColor,
    selectedChainPaths,
    setSelectedChainPaths,
    subchains,
    typeName,
  });

  const { classes: classesTree } = useTreeStyles();
  const { classes, cx } = useChainTypeSelectorWithSubchainsStyles();

  if (!subchains?.length || !allPaths?.length) {
    return null;
  }

  return (
    <FormControl className={classes.parentFormControl}>
      <FormControlLabel
        control={
          <Checkbox
            className={classes.chainCheckbox}
            checked={isParentChecked}
            indeterminate={isParentIndeterminate}
            onClick={handleChangeParent}
          />
        }
        label={
          <span
            className={cx({
              [classes.hasPremiumColor]: hasPremiumColor,
            })}
          >
            {typeName}
          </span>
        }
      />

      <Box className={cx(classesTree.treeWrapper, classes.childrenWrapper)}>
        {subchains?.length > 1 && (
          <>
            {subchains.map(subChain => (
              <SubchainSelector
                key={subChain.id}
                classes={{
                  root: cx(classesTree.treeItem, classes.childSelector),
                }}
                checkBoxClassName={classes.chainCheckbox}
                subChain={subChain}
                endpoints={endpoints}
                selectedChainPaths={selectedChainPaths}
                handleChangeChild={handleChangeChild}
              />
            ))}
          </>
        )}
      </Box>
    </FormControl>
  );
};
