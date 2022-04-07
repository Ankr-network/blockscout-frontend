import { Box } from '@material-ui/core';
import { useCallback, useMemo } from 'react';

import { Token } from 'modules/common/types/token';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { SwitchSelect } from 'uiKit/SwitchSelect';

import { TSwapOption } from '../../../../types';

import { useSwapOptionsStyles } from './useSwapOptionsStyles';

export interface ISwapOptionsProps {
  swapOption: TSwapOption;
  onChooseAEthB: () => void;
  onChooseAEthC: () => void;
}

const DEFAULT_ICON_PROPS = {
  size: 32,
};

const FROM_TOKENS = [
  {
    label: Token.aETHb,
    value: Token.aETHb,
    icon: <AETHBIcon {...DEFAULT_ICON_PROPS} />,
  },
];

const TO_TOKENS = [
  {
    label: Token.aETHc,
    value: Token.aETHc,
    icon: <AETHCIcon {...DEFAULT_ICON_PROPS} />,
  },
];

export const SwapOptions = ({
  swapOption,
  onChooseAEthB,
  onChooseAEthC,
}: ISwapOptionsProps): JSX.Element => {
  const classes = useSwapOptionsStyles();

  const fromOptions = useMemo(
    () => (swapOption === Token.aETHb ? FROM_TOKENS : TO_TOKENS),
    [swapOption],
  );

  const toOptions = useMemo(
    () => (swapOption === Token.aETHb ? TO_TOKENS : FROM_TOKENS),
    [swapOption],
  );

  const values = useMemo(
    () => ({
      from: swapOption === Token.aETHb ? Token.aETHb : Token.aETHc,
      to: swapOption === Token.aETHb ? Token.aETHc : Token.aETHb,
    }),
    [swapOption],
  );

  const handleChooseSwapOption = useCallback(() => {
    if (swapOption === Token.aETHb) {
      onChooseAEthC();
      return;
    }

    onChooseAEthB();
  }, [swapOption, onChooseAEthC, onChooseAEthB]);

  return (
    <Box className={classes.swapChips}>
      <SwitchSelect
        from={fromOptions}
        to={toOptions}
        values={values}
        onChangeFrom={onChooseAEthB}
        onChangeSwitch={handleChooseSwapOption}
        onChangeTo={onChooseAEthC}
      />
    </Box>
  );
};
