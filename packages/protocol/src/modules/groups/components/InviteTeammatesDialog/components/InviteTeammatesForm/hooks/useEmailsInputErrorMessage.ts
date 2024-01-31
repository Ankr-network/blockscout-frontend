import { useCallback, useEffect, useState } from 'react';

export const useEmailsInputErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const resetErrorMessage = useCallback(() => setErrorMessage(undefined), []);

  // we should only reset the state on unmount, so deps are empty
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => resetErrorMessage(), []);

  return { errorMessage, resetErrorMessage, setErrorMessage };
};
