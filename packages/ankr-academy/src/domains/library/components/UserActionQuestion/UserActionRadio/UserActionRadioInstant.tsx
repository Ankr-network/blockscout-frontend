import React from 'react';
import { AnswerControl } from '../../../types';
import { UserActionAnswerControl } from '../UserActionAnswerControl';
import { UserActionRadioUI } from './UserActionRadioUI';
import { UserActionButton } from '../../UserActionButton';

interface IUserActionProps {
  question: string;
  controls: AnswerControl[];
  buttonText: string;
  loadNextBlock: () => void;
  className?: string;
}

export const UserActionRadioInstant = ({
  question,
  controls,
  buttonText,
  loadNextBlock,
  className,
}: IUserActionProps) => {
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
      <UserActionRadioUI
        className={className}
        question={question}
        controlElements={controls.map(renderRadioItem)}
        handleChange={handleRadioChange}
      />
      {isSubmitted && (
        <UserActionButton text={buttonText} onClick={loadNextBlock} />
      )}
    </>
  );
};
