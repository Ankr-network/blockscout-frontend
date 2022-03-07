interface IUseErrorMessage {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessage => {
  const hasError = false;
  const onErroMessageClick = () => {};

  return {
    hasError,
    onErroMessageClick,
  };
};
