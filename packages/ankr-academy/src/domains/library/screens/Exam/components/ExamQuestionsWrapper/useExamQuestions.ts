import { useState } from 'react';
import { ExamQuestions } from '../../../../types';

type ExamAnswers = {
  [questionId: string]: string[];
};

type CheckedUserAnswer = { [questionId: string]: boolean };

export const useExamQuestions = ({
  questions,
  allowableWrongAnswersCount,
}: ExamQuestions) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [examAnswers, setExamAnswers] = useState<ExamAnswers>({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const isUserAnsweredAllQuestions =
    questions.length === Object.keys(examAnswers).length;
  const isUserPassedExam =
    correctAnswersCount >= questions.length - allowableWrongAnswersCount;

  const validateAnswers = (): CheckedUserAnswer[] => {
    const userAnswers = questions.map(question => {
      const currentQuestionUserAnswers = examAnswers[question.id];
      const correctAnswers = question.controls.filter(i => i.isCorrect);
      const isValid = correctAnswers.every(answer => {
        return currentQuestionUserAnswers.includes(answer.value);
      });
      return { [question.id]: isValid };
    });
    const correctUserAnswers = userAnswers.filter(i => Object.values(i)[0]);
    const correctUserAnswersCount = correctUserAnswers.length;

    setCorrectAnswersCount(correctUserAnswersCount);

    return userAnswers;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    validateAnswers();
  };

  const onSelectRadio = (questionId: string, value: string) => {
    setExamAnswers({ ...examAnswers, [questionId]: [value] });
  };

  const onSelectCheckbox = (questionId: string, value: string) => {
    const currentQuestionAnswers = examAnswers[questionId];

    if (currentQuestionAnswers) {
      return setExamAnswers(oldState => {
        const currentSelectedValues = oldState[questionId];
        let newValue;

        if (currentSelectedValues.includes(value)) {
          newValue = currentSelectedValues.filter(i => i !== value);
        } else {
          newValue = [...currentSelectedValues, value];
        }

        return {
          ...oldState,
          [questionId]: newValue,
        };
      });
    }

    return setExamAnswers({ ...examAnswers, [questionId]: [value] });
  };

  return {
    examAnswers,
    isSubmitted,
    onSelectRadio,
    isUserPassedExam,
    onSelectCheckbox,
    isUserAnsweredAllQuestions,
    handleSubmit,
    correctAnswersCount,
  };
};
