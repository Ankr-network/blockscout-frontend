import React from 'react';
import { UserActionCheckboxUI } from './UserActionCheckboxUI';
import { AnswerControl } from '../../../types';
import { UserActionAnswerControl } from '../UserActionAnswerControl';

interface IUserActionCheckboxDelayedProps {
  id: string;
  question: string;
  controls: AnswerControl[];
  className?: string;
  isSubmitted: boolean;
  selectedValues?: string[];
  onSelect: (questionId: string, value: string) => void;
  showCorrectAnswers?: boolean;
  preQuestionText?: string;
  description?: string;
}

export const UserActionCheckboxDelayed = ({
  id,
  question,
  controls,
  className,
  isSubmitted,
  selectedValues,
  onSelect,
  showCorrectAnswers,
  preQuestionText,
  description,
}: IUserActionCheckboxDelayedProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.target as HTMLInputElement;
    const currentValue = currentTarget.value;
    onSelect(id, currentValue);
  };

  const renderControl = (control: AnswerControl) => {
    const isCurrentControlActive = selectedValues?.includes(control.value);
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
        controlType="checkbox"
      />
    );
  };

  return (
    <UserActionCheckboxUI
      className={className}
      question={question}
      controlElements={controls.map(renderControl)}
      handleChange={handleChange}
      hasSubmitButton={false}
      isSubmitted={isSubmitted}
      preQuestionText={preQuestionText}
      description={description}
    />
  );
};
