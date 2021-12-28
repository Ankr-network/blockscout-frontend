import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import { RadioButton } from '../../types';
import { UserActionButton } from '../UserActionButton/UserActionButton';
import { ReactComponent as RadioIcon } from 'assets/img/RadioButton/Normal.svg';
import { ReactComponent as RadioIconChecked } from 'assets/img/RadioButton/Checked.svg';
import { useUserActionRadioStyles } from './UserActionRadioStyles';

interface IUserActionProps {
  question: string;
  controls: RadioButton[];
  buttonText: string;
  onClick: () => void;
  className?: string;
}

export const UserActionRadio = ({
  question,
  controls,
  buttonText,
  onClick,
  className,
}: IUserActionProps) => {
  const classes = useUserActionRadioStyles();

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.target as HTMLInputElement;
    const currentValue = currentTarget.value;
    setValue(currentTarget.value);

    const currentControl = controls.find(
      control => control.value === currentValue,
    );
    const isCorrectAnswer = currentControl?.isCorrect;
    setError(!isCorrectAnswer);
  };

  const renderRadioItem = (control: RadioButton) => {
    const isCurrentControlActive = control.value === value;
    const isCorrectAnswer = isCurrentControlActive && !error;
    const isIncorrectAnswer = isCurrentControlActive && error;

    return (
      <Box
        key={control.value}
        className={classNames(
          classes.controlWrapper,
          isCorrectAnswer && classes.controlWrapperSuccess,
          isIncorrectAnswer && classes.controlWrapperError,
        )}
      >
        <FormControlLabel
          className={classes.label}
          key={control.value}
          value={control.value}
          control={
            <Radio
              icon={<RadioIcon />}
              checkedIcon={<RadioIconChecked />}
              classes={{ root: classes.radioButton }}
              className={classNames(
                isIncorrectAnswer && classes.radioButtonError,
                isCorrectAnswer && classes.radioButtonSuccess,
              )}
              color="primary"
            />
          }
          label={control.label}
        />
        {isCorrectAnswer && (
          <Typography
            className={classNames(
              classes.radioStatus,
              classes.radioStatusSuccess,
            )}
            variant="body2"
          >
            correct answer
          </Typography>
        )}
        {isIncorrectAnswer && (
          <Typography
            className={classNames(
              classes.radioStatus,
              classes.radioStatusError,
            )}
            variant="body2"
          >
            incorrect answer
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <>
      <Box className={classNames(classes.formWrapper, className)}>
        <FormControl className={classes.formControl} component="fieldset">
          <FormLabel className={classes.legend} component="legend">
            <Typography variant="h4" color="textPrimary">
              {question}
            </Typography>
          </FormLabel>
          <RadioGroup name="radio-buttons-group" onChange={handleRadioChange}>
            {controls.map(renderRadioItem)}
          </RadioGroup>
        </FormControl>
      </Box>

      {value && !error && (
        <UserActionButton text={buttonText} onClick={onClick} />
      )}
    </>
  );
};
