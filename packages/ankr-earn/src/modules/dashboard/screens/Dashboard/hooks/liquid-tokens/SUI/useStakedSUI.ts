interface IUseStakedSUI {
  isStakedSuiCertShowed: boolean;
  isSuiCommonLoading: boolean;
}

export const useStakedSUI = (): IUseStakedSUI => {
  return {
    isStakedSuiCertShowed: true,
    isSuiCommonLoading: false,
  };
};
