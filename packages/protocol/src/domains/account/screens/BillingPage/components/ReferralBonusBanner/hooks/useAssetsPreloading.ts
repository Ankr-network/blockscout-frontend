import { useImagePreloader } from 'modules/common/hooks/useImagePreloader';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import background from '../assets/background.png';
import coins from '../assets/coins.png';
import mobileBackground from '../assets/mobile-background.png';

export const useAssestsPreloader = () => {
  const isMobile = useIsXSDown();

  const [backgroundSrc, coinsSrc] = isMobile
    ? [background, coins]
    : [mobileBackground, undefined];

  const { isLoaded: isBackgroundImageLoaded } = useImagePreloader({
    src: backgroundSrc,
  });

  const { isLoaded: isCoinsImageLoaded } = useImagePreloader({ src: coinsSrc });

  const areAssestsLoaded = isBackgroundImageLoaded && isCoinsImageLoaded;

  return { areAssestsLoaded };
};
