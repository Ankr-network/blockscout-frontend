import { Box } from '@material-ui/core';
import { useCallback, useMemo } from 'react';

import { Token } from 'modules/common/types/token';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
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
  from,
  to,
  onChooseFrom,
  onChooseTo,
}: ISwapOptionsProps): JSX.Element => {
  const classes = useSwapOptionsStyles();

  const fromOptions = useMemo(
    () => (from === Token.aETHb ? FROM_TOKENS : TO_TOKENS),
    [from],
  );

  const toOptions = useMemo(
    () => (from === Token.aETHb ? TO_TOKENS : FROM_TOKENS),
    [from],
  );

  const values = useMemo(() => ({ from, to }), [from, to]);

  const handleChooseSwapOption = useCallback(() => {
    onChooseFrom(to);
    onChooseTo(from);
  }, [from, to, onChooseFrom, onChooseTo]);

  return (
    <Box className={classes.swapChips}>
      <SwitchSelect
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
