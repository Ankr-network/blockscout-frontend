import { Slider, SliderProps } from '@material-ui/core';
import { ChangeEvent } from 'react';

import { ValueLabel } from './ValueLabel';

export interface IYieldSliderProps
  extends Omit<
    SliderProps,
    'ValueLabelComponent' | 'valueLabelDisplay' | 'onChange'
  > {
  onChange?: (
    event: ChangeEvent<Record<string, unknown>>,
    value: number | number[],
  ) => void;
}

export const YieldSlider = ({
  ...restProps
}: IYieldSliderProps): JSX.Element => {
  return (
    <Slider
      {...restProps}
      ValueLabelComponent={ValueLabel}
      valueLabelDisplay="auto"
    />
  );
};
