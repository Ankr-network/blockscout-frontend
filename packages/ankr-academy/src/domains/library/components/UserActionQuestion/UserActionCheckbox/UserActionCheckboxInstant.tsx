import React from 'react';

import { AnswerControl } from '../../../types';
import { UserActionAnswerControl } from '../UserActionAnswerControl';
import { UserActionCheckboxUI } from './UserActionCheckboxUI';
import { UserActionButton } from '../../UserActionButton';

interface IUserActionCheckboxProps {
  question: string;
  controls: AnswerControl[];
  buttonText: string;
  loadNextBlock: () => void;
  className?: string;
}

export const UserActionCheckboxInstant = ({
  question,
  controls,
  buttonText,
  loadNextBlock,
  className,
}: IUserActionCheckboxProps) => {
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
      <UserActionCheckboxUI
        className={className}
        question={question}
        controlElements={controls.map(renderCheckboxItem)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        hasSubmitButton
      />
      {isSubmitted && (
        <UserActionButton text={buttonText} onClick={loadNextBlock} />
      )}
    </>
  );
};
