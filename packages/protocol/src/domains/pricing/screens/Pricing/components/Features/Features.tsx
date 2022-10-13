import { useIsXSDown } from 'ui';
import { FeatureTable } from './FeatureTable';
import { FeatureTableMobile } from './FeatureTableMobile/FeatureTableMobile';

export const Features = () => {
  const isMobile = useIsXSDown();

  if (isMobile) {
    return <FeatureTableMobile />;
  }

  return <FeatureTable />;
};
