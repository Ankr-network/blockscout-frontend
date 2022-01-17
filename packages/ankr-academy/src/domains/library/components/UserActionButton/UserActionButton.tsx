import React, { useState } from 'react';
import { useUserActionButtonStyles } from './UserActionButtonStyles';
import { Button } from '@material-ui/core';
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';

interface IUserActionProps {
  text: string;
  onClick: () => void;
}

export const UserActionButton = ({ text, onClick }: IUserActionProps) => {
  const classes = useUserActionButtonStyles();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const handleUserClickButton = () => {
    setButtonClicked(true);
    onClick();
  };

  return (
    <>
      {isButtonClicked && (
        <MessagesContainer type="student" messagesList={[text]} />
      )}
      {!isButtonClicked && (
        <Button
          onClick={handleUserClickButton}
          className={classes.btn}
          color="secondary"
        >
          {text}
        </Button>
      )}
    </>
  );
};
