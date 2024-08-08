import { useImagePreloader } from 'modules/common/hooks/useImagePreloader';

import background from '../assets/background.png';
import coins from '../assets/coins.png';

export const useAssestsPreloader = () => {
  const { isLoaded: isBackgroundImageLoaded } = useImagePreloader({
    src: background,
  });

  const { isLoaded: isCoinsImageLoaded } = useImagePreloader({ src: coins });

  const areAssestsLoaded = isBackgroundImageLoaded && isCoinsImageLoaded;

  return { areAssestsLoaded };
};
