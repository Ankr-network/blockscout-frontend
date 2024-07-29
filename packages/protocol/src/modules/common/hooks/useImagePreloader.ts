import { useCallback, useEffect, useState } from 'react';

import { IPreloadImageParams, preloadImage } from '../utils/preloadImage';

export interface IUseImagePreloaderProps extends Partial<IPreloadImageParams> {
  hasManualPreloading?: boolean;
}

export const useImagePreloader = ({
  hasManualPreloading = false,
  src,
}: IUseImagePreloaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImagePreload = useCallback(async () => {
    if (src) {
      setIsLoading(true);

      await preloadImage({ src });

      setIsLoading(false);
      setIsLoaded(true);
    }
  }, [src]);

  useEffect(() => {
    if (src && !hasManualPreloading) {
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
  }, [hasManualPreloading, src]);

  return { handleImagePreload, isLoaded, isLoading };
};
