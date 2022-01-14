import React from 'react';
import {
  FormControl,
  FormLabel,
  Paper,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import { AnswerControl } from '../../../types';
import { UserActionButton } from '../../UserActionButton/UserActionButton';
import { UserActionAnswerControl } from '../UserActionAnswerControl/UserActionAnswerControl';
import { useUserActionQuestionStyles } from '../UserActionQuestionStyles';

interface IUserActionProps {
  question: string;
  controls: AnswerControl[];
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
  const classes = useUserActionQuestionStyles();

  const [value, setValue] = React.useState('');
  // hasError can be used to display error or
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasError, setError] = React.useState(false);
  const isSubmitted = Boolean(value);

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

  const renderRadioItem = (control: AnswerControl) => {
    const isCurrentControlActive = control.value === value;
    const isCorrectAnswer = isCurrentControlActive && control.isCorrect;
    const isIncorrectAnswer = isCurrentControlActive && !control.isCorrect;
    const isCorrectNotAnswered =
      !isCurrentControlActive && isSubmitted && control.isCorrect;

    return (
      <UserActionAnswerControl
        key={control.value}
        control={control}
        isDisabled={isSubmitted}
        isCurrentControlActive={isCurrentControlActive}
        isCorrectAnswer={isCorrectAnswer}
        isIncorrectAnswer={isIncorrectAnswer}
        isCorrectNotAnswered={isCorrectNotAnswered}
        controlType="radio"
      />
    );
  };

  return (
    <>
      <Paper className={classNames(classes.formWrapper, className)}>
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
      </Paper>

      {isSubmitted && <UserActionButton text={buttonText} onClick={onClick} />}
    </>
  );
};
