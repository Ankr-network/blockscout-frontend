import React from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import { AnswerControl } from '../../../types';
import { UserActionAnswerControl } from '../UserActionAnswerControl/UserActionAnswerControl';
import { useUserActionQuestionStyles } from '../UserActionQuestionStyles';
import { UserActionButton } from '../../UserActionButton/UserActionButton';

interface IUserActionCheckboxProps {
  question: string;
  controls: AnswerControl[];
  buttonText: string;
  onClick: () => void;
  className?: string;
}

export const UserActionCheckbox = ({
  question,
  controls,
  buttonText,
  onClick,
  className,
}: IUserActionCheckboxProps) => {
  const classes = useUserActionQuestionStyles();

  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [isSubmitted, setSubmitted] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.target as HTMLInputElement;
    const currentValue = currentTarget.value;
    if (selectedValues.includes(currentValue)) {
      const newValue = selectedValues.filter(v => v !== currentValue);
      setSelectedValues(newValue);
    } else {
      setSelectedValues([...selectedValues, currentValue]);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const renderCheckboxItem = (control: AnswerControl) => {
    const isCurrentControlActive = selectedValues.includes(control.value);
    const isCorrectAnswer =
      isCurrentControlActive && isSubmitted && control.isCorrect;
    const isIncorrectAnswer =
      isCurrentControlActive && isSubmitted && !control.isCorrect;
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
        controlType="checkbox"
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
          <FormGroup onChange={handleChange}>
            {controls.map(renderCheckboxItem)}
          </FormGroup>

          {!isSubmitted && (
            <Button
              className={classes.btnSubmit}
              onClick={handleSubmit}
              type="submit"
              color="secondary"
            >
              Show Answer
            </Button>
          )}
        </FormControl>
      </Paper>

      {isSubmitted && <UserActionButton text={buttonText} onClick={onClick} />}
    </>
  );
};
