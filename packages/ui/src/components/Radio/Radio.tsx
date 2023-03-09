import { Radio as MuiRadio } from '@material-ui/core';
import { ReactComponent as CheckedIcon } from './assets/checked.svg';
import { ReactComponent as UncheckedIcon } from './assets/unchecked.svg';
import { ReactComponent as DisabledIcon } from './assets/disabled.svg';
import { RadioProps } from '@material-ui/core/Radio/Radio';

export const Radio = (props: RadioProps): JSX.Element => {
  const { disabled } = props;

  return (
    <MuiRadio
      checkedIcon={<CheckedIcon />}
      icon={disabled ? <DisabledIcon /> : <UncheckedIcon />}
      {...props}
    />
  );
};
