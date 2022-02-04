import { useCallback } from 'react';
import { Box, Chip } from '@material-ui/core';

import { ArrowIcon } from 'uiKit/Icons/ArrowIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { TSwapOption } from '../../../../types';
import { useSwapOptionsStyles } from './styles';

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
        data-testid="aETHb-chip"
        icon={<AETHBIcon />}
        clickable={false}
        className={classes.swapChip}
        label="aETHb"
        onClick={onChooseAEthB}
      />
    ) : (
      <Chip
        data-testid="aETHc-chip"
        icon={<AETHCIcon />}
        clickable={false}
        className={classes.swapChip}
        label="aETHc"
        onClick={onChooseAEthC}
      />
    );

  return (
    <Box className={classes.swapChips}>
      {renderChip(swapOption === 'aETHb')}

      <div
        data-testid="arrow-chip"
        className={classes.arrowIconWrapper}
        role="button"
        onClick={handleChooseSwapOption}
      >
        <ArrowIcon />
      </div>

      {renderChip(swapOption === 'aETHc')}
    </Box>
  );
};
