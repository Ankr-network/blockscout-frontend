import React from 'react';
import { UserActionType } from '../../types';
import { UserActionButton } from '../UserActionButton/UserActionButton';
import { UserActionRadio } from '../UserActionRadio/UserActionRadio';
import { UserActionRate } from '../UserActionRate/UserActionRate';

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
    case 'rate':
      return <UserActionRate onClick={loadNextBlock} />;
    case 'next':
      return <>TODO user action type next</>;
    default:
      throw new Error('wrong user action type');
  }
};
