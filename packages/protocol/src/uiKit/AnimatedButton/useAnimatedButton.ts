import { useEffect, useState } from 'react';

const TIMEOUT = 1000;

export interface IUseAnimatedButtonParams {
  data: any;
}

export const useAnimatedButton = ({ data }: IUseAnimatedButtonParams) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (data) {
      setIsSuccess(true);
      timeoutId = setTimeout(() => setIsSuccess(false), TIMEOUT);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [data]);

  return {
    isSuccess,
  };
};
