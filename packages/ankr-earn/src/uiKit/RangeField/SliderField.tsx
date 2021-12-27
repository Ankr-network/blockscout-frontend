import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText, hasError } from 'modules/common/utils/form';
import FormHelperText from '@material-ui/core/FormHelperText';

interface ISliderProps extends FieldRenderProps<HTMLElement>, SliderProps {
  label?: string;
}

export const SliderField = ({
  className,
  input: { name, onChange, value, onBlur },
  meta,
  label,
  ...props
}: ISliderProps) => {
  const error = hasError(meta);
  const errorText = getErrorText(meta);

  const handleOnChange = (
    event: React.ChangeEvent<any>,
    value: number | number[],
  ) => {
    onChange(value as any);
  };

  const handleOnBlur = () => {
    onBlur();
  };

  return (
    <>
      <Slider
        onBlur={handleOnBlur}
        name={name}
        value={+value}
        onChange={handleOnChange}
        {...props}
      />
      {error && <FormHelperText error={true}>{errorText}</FormHelperText>}
    </>
  );
};
