import { Slider, SliderProps } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { getErrorText, hasError } from 'modules/common/utils/form';

interface ISliderProps extends FieldRenderProps<HTMLElement>, SliderProps {
  label?: string;
}

export const SliderField = ({
  className,
  input: { name, onChange, value, onBlur },
  meta,
  label,
  ...props
}: ISliderProps): JSX.Element => {
  const error = hasError(meta);
  const errorText = getErrorText(meta);

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    input: number | number[],
  ) => {
    onChange(input);
  };

  const handleBlur = () => {
    onBlur();
  };

  return (
    <>
      <Slider
        name={name}
        value={+value}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />

      {error && <FormHelperText error>{errorText}</FormHelperText>}
    </>
  );
};
