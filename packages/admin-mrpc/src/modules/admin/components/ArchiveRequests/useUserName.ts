import { ChangeEvent, useState } from 'react';

export const useUserName = () => {
  const [userInputValue, setUserInputValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInputValue(event.target.value);
  };

  return {
    userInputValue,
    onChange,
  };
};
