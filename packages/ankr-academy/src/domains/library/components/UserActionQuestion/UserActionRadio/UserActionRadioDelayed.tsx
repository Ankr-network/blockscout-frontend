import React from 'react';
import { UserActionRadioUI } from './UserActionRadioUI';
import { AnswerControl } from '../../../types';
import { UserActionAnswerControl } from '../UserActionAnswerControl';

interface IUserActionRadioDelayedProps {
  id: string;
  question: string;
  controls: AnswerControl[];
  className?: string;
  isSubmitted: boolean;
  selectedValue?: string;
  onSelect: (questionId: string, value: string) => void;
  showCorrectAnswers?: boolean;
  preQuestionText?: string;
  description?: string;
}

export const UserActionRadioDelayed = ({
  id,
  className,
  question,
  controls,
  isSubmitted,
  selectedValue,
  onSelect,
  showCorrectAnswers,
  preQuestionText,
  description,
}: IUserActionRadioDelayedProps) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.target as HTMLInputElement;
    const currentValue = currentTarget.value;
    onSelect(id, currentValue);
  };

  const renderRadioItem = (control: AnswerControl) => {
    const isCurrentControlActive = control.value === selectedValue;
    const isCorrectAnswer =
      isCurrentControlActive && isSubmitted && control.isCorrect;
    const isIncorrectAnswer =
      isCurrentControlActive && isSubmitted && !control.isCorrect;
    const isCorrectNotAnswered =
      !isCurrentControlActive &&
      isSubmitted &&
      showCorrectAnswers &&
      control.isCorrect;

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
    <UserActionRadioUI
      className={className}
      question={question}
      controlElements={controls.map(renderRadioItem)}
      handleChange={handleRadioChange}
      preQuestionText={preQuestionText}
      description={description}
    />
  );
};
