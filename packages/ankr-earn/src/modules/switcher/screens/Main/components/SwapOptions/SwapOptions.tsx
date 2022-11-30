import { Box } from '@material-ui/core';
import compact from 'lodash/compact';
import { useMemo } from 'react';

import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from 'uiKit/Icons/AAvaxCIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AFTMCIcon } from 'uiKit/Icons/AFTMCIcon';
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
    {
      label: Token.aBNBb,
      value: Token.aBNBb,
      icon: <ABNBBIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: Token.aMATICb,
      value: Token.aMATICb,
      icon: <AMATICBIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: Token.aFTMb,
      value: Token.aFTMb,
      icon: <AFTMBIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: Token.aAVAXb,
      value: Token.aAVAXb,
      icon: <AAvaxBIcon {...DEFAULT_ICON_PROPS} />,
    },
  ]),

  to: compact([
    {
      label: getTokenName(Token.aETHc),
      value: Token.aETHc,
      icon: <AETHCIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: getTokenName(Token.aBNBc),
      value: Token.aBNBc,
      icon: <ABNBCIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: getTokenName(Token.aMATICc),
      value: Token.aMATICc,
      icon: <AMATICCIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: getTokenName(Token.aFTMc),
      value: Token.aFTMc,
      icon: <AFTMCIcon {...DEFAULT_ICON_PROPS} />,
    },
    {
      label: getTokenName(Token.aAVAXc),
      value: Token.aAVAXc,
      icon: <AAvaxCIcon {...DEFAULT_ICON_PROPS} />,
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

  const values = useMemo(() => ({ from, to }), [from, to]);

  return (
    <Box className={classes.swapChips}>
      <SwitchSelect
        isOneWay
        isPairSelect
        from={AVAILABLE_SWAP_TOKENS.from}
        to={AVAILABLE_SWAP_TOKENS.to}
        values={values}
        onChangeFrom={onChooseFrom}
        onChangeTo={onChooseTo}
      />
    </Box>
  );
};
