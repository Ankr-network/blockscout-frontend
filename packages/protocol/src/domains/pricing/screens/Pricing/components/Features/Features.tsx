import { useHasBreakdown } from 'uiKit/Theme/useTheme';
import { FeatureTable } from './FeatureTable';
import { FeatureTableMobile } from './FeatureTableMobile/FeatureTableMobile';

const MOBILE_SCREEN = 760;

export const Features = () => {
  const isMobile = useHasBreakdown(MOBILE_SCREEN);

  if (isMobile) {
    return <FeatureTableMobile />;
  }

  return <FeatureTable />;
};
