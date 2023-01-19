import { useIsXSDown } from 'uiKit/Theme/useTheme';
import { FeatureTable } from './FeatureTable';
import { FeatureTableMobile } from './FeatureTableMobile/FeatureTableMobile';

export const Features = () => {
  const isMobile = useIsXSDown();

  if (isMobile) {
    return <FeatureTableMobile />;
  }

  return <FeatureTable />;
};
