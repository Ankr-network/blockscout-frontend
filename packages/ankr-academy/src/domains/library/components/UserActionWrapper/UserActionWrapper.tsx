import React from 'react';
import { uid } from 'react-uid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ExamQuestions, UserActionType } from 'domains/library/types';
import { LibraryRoutesConfig } from 'domains/library/LibraryRouterConfig';
import { ExamQuestionsWrapper } from 'domains/library/screens/Exam/components/ExamQuestionsWrapper';
import { UserActionButton } from '../UserActionButton';
import {
  UserActionRadioInstant,
  UserActionCheckboxInstant,
} from '../UserActionQuestion';
import { UserActionRate } from '../UserActionRate';

interface IUserActionWrapperProps {
  userAction: UserActionType | ExamQuestions;
  loadNextBlock: () => void;
}

export const UserActionWrapper = ({
  userAction,
  loadNextBlock,
}: IUserActionWrapperProps) => {
  switch (userAction.type) {
    case 'button':
      return (
        <UserActionButton
          key={uid(userAction.buttonText)}
          text={userAction.buttonText}
          onClick={loadNextBlock}
        />
      );
    case 'radio':
      return (
        <UserActionRadioInstant
          question={userAction.question}
          controls={userAction.controls}
          buttonText={userAction.buttonText}
          loadNextBlock={loadNextBlock}
        />
      );
    case 'checkbox':
      return (
        <UserActionCheckboxInstant
          question={userAction.question}
          controls={userAction.controls}
          buttonText={userAction.buttonText}
          loadNextBlock={loadNextBlock}
        />
      );
    case 'rate':
      return <UserActionRate onClick={loadNextBlock} />;
    case 'null':
      return null;
    case 'examLink':
      return (
        <Button
          key={uid(userAction.examId)}
          color="secondary"
          component={Link}
          to={LibraryRoutesConfig.exam.generatePath(userAction.examId)}
        >
          {userAction.buttonText}
        </Button>
      );
    case 'examQuestions':
      return <ExamQuestionsWrapper examQuestions={userAction} />;
    default:
      throw new Error('wrong user action type');
  }
};
