interface IUseErrorMessageData {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessageData => {
  return {
    hasError: false,
    onErroMessageClick: () => null,
  };
};
