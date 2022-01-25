import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { ExamQuestions } from 'domains/library/types';
import {
  UserActionRadioDelayed,
  UserActionCheckboxDelayed,
} from 'domains/library/components/UserActionQuestion';
import { useExamQuestions } from './useExamQuestions';
import { useExamQuestionsStyles } from './ExamQuestionsStyles';

interface IExamQuestionsProps {
  examQuestions: ExamQuestions;
}

export const ExamQuestionsWrapper = ({
  examQuestions,
}: IExamQuestionsProps) => {
  const classes = useExamQuestionsStyles();
  const {
    examAnswers,
    isSubmitted,
    onSelectRadio,
    isUserPassedExam,
    onSelectCheckbox,
    isUserAnsweredAllQuestions,
    handleSubmit,
    correctAnswersCount,
  } = useExamQuestions(examQuestions);
  const { questions } = examQuestions;
  return (
    <>
      {questions.map((q, i) => {
        const currentAnswers = examAnswers[q.id];
        const questionIndexText = `Question ${i + 1} of ${questions.length}`;

        switch (q.type) {
          case 'radio':
            // can be only one answer for radio
            const selectedValue = currentAnswers
              ? currentAnswers[0]
              : undefined;
            return (
              <UserActionRadioDelayed
                className={classes.question}
                key={q.id}
                id={q.id}
                question={q.question}
                controls={q.controls}
                isSubmitted={isSubmitted}
                selectedValue={selectedValue}
                onSelect={onSelectRadio}
                showCorrectAnswers={isUserPassedExam}
                preQuestionText={questionIndexText}
                description={q.description}
              />
            );
          case 'checkbox':
            return (
              <UserActionCheckboxDelayed
                className={classes.question}
                key={q.id}
                id={q.id}
                question={q.question}
                controls={q.controls}
                isSubmitted={isSubmitted}
                selectedValues={currentAnswers}
                onSelect={onSelectCheckbox}
                showCorrectAnswers={isUserPassedExam}
                preQuestionText={questionIndexText}
                description={q.description}
              />
            );
          default:
            throw Error(`unexpected question type ${q}`);
        }
      })}

      {!isSubmitted && (
        <Button
          disabled={!isUserAnsweredAllQuestions}
          onClick={handleSubmit}
          color="secondary"
        >
          Check answers
        </Button>
      )}

      {isSubmitted && (
        <>
          <br />
          <br />
          <Typography variant="h1">
            You {isUserPassedExam ? 'passed' : 'failed'} the exam
          </Typography>
          <Typography variant="h3">
            Correct answers: {correctAnswersCount} / {questions.length}
          </Typography>

          {!isUserPassedExam && (
            <Box marginTop={3} display="flex" justifyContent="center">
              <Button
                color="secondary"
                onClick={() => window.location.reload()}
              >
                retake the exam
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};
