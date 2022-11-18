import { featuresConfig } from 'modules/common/const';

interface IUseStakedSUI {
  isStakedSuiCertShowed: boolean;
  isSuiCommonLoading: boolean;
}

export const useStakedSUI = (): IUseStakedSUI => {
  return {
    isStakedSuiCertShowed: featuresConfig.isSUIStakingActive,
    isSuiCommonLoading: false,
  };
};
