import { useEffect, useState } from 'react';

import { IPreloadImageParams, preloadImage } from '../utils/preloadImage';

export interface IUseImagePreloaderProps extends Partial<IPreloadImageParams> {}

export const useImagePreloader = ({ src }: IUseImagePreloaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      let isAborted = false;

      setIsLoading(true);
      preloadImage({ src }).then(() => {
        if (!isAborted) {
          setIsLoading(false);
          setIsLoaded(true);
        }
      });

      return () => {
        isAborted = true;
      };
    }

    return () => {};
  }, [src]);

  return { isLoaded, isLoading };
};
