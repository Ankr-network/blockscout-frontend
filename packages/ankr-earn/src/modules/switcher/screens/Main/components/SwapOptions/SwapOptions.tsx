import { Box } from '@material-ui/core';
import compact from 'lodash/compact';
import { useCallback, useMemo } from 'react';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';
import { SwitchSelect } from 'uiKit/SwitchSelect';

import { useSwapOptionsStyles } from './useSwapOptionsStyles';

export interface ISwapOptionsProps {
  from: Token;
  to: Token;
  onChooseFrom: (value: string) => void;
  onChooseTo: (value: string) => void;
}

const DEFAULT_ICON_PROPS = {
  size: 32,
};

const AVAILABLE_SWAP_TOKENS = {
  from: compact([
    {
      label: Token.aETHb,
      value: Token.aETHb,
      icon: <AETHBIcon {...DEFAULT_ICON_PROPS} />,
    },
    featuresConfig.switcherBnb && {
      label: Token.aBNBb,
      value: Token.aBNBb,
      icon: <ABNBBIcon {...DEFAULT_ICON_PROPS} />,
    },
    featuresConfig.switcherMatic && {
      label: Token.aMATICb,
      value: Token.aMATICb,
      icon: <AMATICBIcon {...DEFAULT_ICON_PROPS} />,
    },
  ]),

  to: compact([
    {
      label: Token.aETHc,
      value: Token.aETHc,
      icon: <AETHCIcon {...DEFAULT_ICON_PROPS} />,
    },
    featuresConfig.switcherBnb && {
      label: Token.aBNBc,
      value: Token.aBNBc,
      icon: <ABNBCIcon {...DEFAULT_ICON_PROPS} />,
    },
    featuresConfig.switcherMatic && {
      label: Token.aMATICc,
      value: Token.aMATICc,
      icon: <AMATICCIcon {...DEFAULT_ICON_PROPS} />,
    },
  ]),
};

export const SwapOptions = ({
  from,
  to,
  onChooseFrom,
  onChooseTo,
}: ISwapOptionsProps): JSX.Element => {
  const classes = useSwapOptionsStyles();

  const isDirectSwap = useMemo(
    () => AVAILABLE_SWAP_TOKENS.from.some(({ value }) => value === from),
    [from],
  );

  const fromOptions = useMemo(
    () =>
      isDirectSwap ? AVAILABLE_SWAP_TOKENS.from : AVAILABLE_SWAP_TOKENS.to,
    [isDirectSwap],
  );

  const toOptions = useMemo(
    () =>
      isDirectSwap ? AVAILABLE_SWAP_TOKENS.to : AVAILABLE_SWAP_TOKENS.from,
    [isDirectSwap],
  );

  const values = useMemo(() => ({ from, to }), [from, to]);

  const handleChooseSwapOption = useCallback(() => {
    onChooseFrom(to);
    onChooseTo(from);
  }, [from, to, onChooseFrom, onChooseTo]);

  return (
    <Box className={classes.swapChips}>
      <SwitchSelect
        isPairSelect
        from={fromOptions}
        to={toOptions}
        values={values}
        onChangeFrom={onChooseFrom}
        onChangeSwitch={handleChooseSwapOption}
        onChangeTo={onChooseTo}
      />
    </Box>
  );
};
