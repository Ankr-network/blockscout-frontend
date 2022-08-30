import { Slider, SliderProps } from '@material-ui/core';
import { ChangeEvent } from 'react';

import { ValueLabel } from './ValueLabel';

export interface ICalcSliderProps
  extends Omit<
    SliderProps,
    'ValueLabelComponent' | 'valueLabelDisplay' | 'onChange'
  > {
  onChange?: (
    event: ChangeEvent<Record<string, unknown>>,
    value: number | number[],
  ) => void;
}

export const CalcSlider = ({ ...restProps }: ICalcSliderProps): JSX.Element => {
  return (
    <Slider
      {...restProps}
      ValueLabelComponent={ValueLabel}
      valueLabelDisplay="auto"
    />
  );
};
