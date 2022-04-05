import { Box, Chip } from '@material-ui/core';
import { useCallback } from 'react';

import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { ArrowIcon } from 'uiKit/Icons/ArrowIcon';

import { TSwapOption } from '../../../../types';

import { useSwapOptionsStyles } from './useSwapOptionsStyles';

export interface ISwapOptionsProps {
  swapOption: TSwapOption;
  onChooseAEthB: () => void;
  onChooseAEthC: () => void;
}

export const SwapOptions = ({
  swapOption,
  onChooseAEthB,
  onChooseAEthC,
}: ISwapOptionsProps): JSX.Element => {
  const classes = useSwapOptionsStyles();

  const handleChooseSwapOption = useCallback(() => {
    if (swapOption === 'aETHb') {
      onChooseAEthC();
      return;
    }

    onChooseAEthB();
  }, [swapOption, onChooseAEthC, onChooseAEthB]);

  const renderChip = (predicate: boolean): JSX.Element =>
    predicate ? (
      <Chip
        className={classes.swapChip}
        clickable={false}
        data-testid="aETHb-chip"
        icon={<AETHBIcon />}
        label="aETHb"
        onClick={onChooseAEthB}
      />
    ) : (
      <Chip
        className={classes.swapChip}
        clickable={false}
        data-testid="aETHc-chip"
        icon={<AETHCIcon />}
        label="aETHc"
        onClick={onChooseAEthC}
      />
    );

  return (
    <Box className={classes.swapChips}>
      {renderChip(swapOption === 'aETHb')}

      <div
        className={classes.arrowIconWrapper}
        data-testid="arrow-chip"
        role="button"
        tabIndex={0}
        onClick={handleChooseSwapOption}
      >
        <ArrowIcon />
      </div>

      {renderChip(swapOption === 'aETHc')}
    </Box>
  );
};
