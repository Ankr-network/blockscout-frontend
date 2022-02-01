import { useEffect, useState } from 'react';
import { useAMATICBCard } from '../components/AMATICBCard/useAMATICBCard';
import { useMaticTxHistory } from '../components/AMATICBCard/useMaticTxHistory';
import { useMaticStakableAsset } from '../components/StakableTokens/useMaticStakableAsset';

export const useAssetsLoading = () => {
  const [loadFiredOnce, setLoadFiredOnce] = useState(false);

  const MATICTxHistory = useMaticTxHistory();
  const aMATICbData = useAMATICBCard(MATICTxHistory.hasHistory);
  const maticAsset = useMaticStakableAsset();

  const isLoading =
    !loadFiredOnce ||
    maticAsset.isLoading ||
    aMATICbData.isStakeLoading ||
    MATICTxHistory.loading;

  const isDashboardEmpty = !isLoading && !aMATICbData.isShowed;

  useEffect(() => {
    if (isLoading) {
      setLoadFiredOnce(true);
    }
  }, [isLoading]);

  return {
    isDashboardEmpty,
    isLoading,
  };
};
