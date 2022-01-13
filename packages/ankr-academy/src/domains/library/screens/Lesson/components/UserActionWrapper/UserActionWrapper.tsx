import React from 'react';
import { uid } from 'react-uid';
import { UserActionType } from '../../types';
import { UserActionButton } from '../UserActionButton/UserActionButton';
import { UserActionRadio } from '../UserActionQuestion/UserActionRadio/UserActionRadio';
import { UserActionRate } from '../UserActionRate/UserActionRate';
import { UserActionCheckbox } from '../UserActionQuestion/UserActionCheckbox/UserActionCheckbox';

interface IUserActionWrapperProps {
  userAction: UserActionType;
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
        <UserActionRadio
          question={userAction.question}
          controls={userAction.controls}
          buttonText={userAction.buttonText}
          onClick={loadNextBlock}
        />
      );
    case 'checkbox':
      return (
        <UserActionCheckbox
          question={userAction.question}
          controls={userAction.controls}
          buttonText={userAction.buttonText}
          onClick={loadNextBlock}
        />
      );
    case 'rate':
      return <UserActionRate onClick={loadNextBlock} />;
    case 'next':
      return null;
    default:
      throw new Error('wrong user action type');
  }
};
