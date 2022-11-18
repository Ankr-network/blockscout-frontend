import { useState, useCallback, useEffect } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackClickGoToDashboard } from 'modules/analytics/tracking-actions/trackClickGoToDashboard';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

export interface IProgressStepHookData {
  isTxCopied: boolean;
  isAddressCopied: boolean;
  chainId: number;
  handleCopyDestinationAddress: () => void;
  handleCopyTxHash: () => void;
  onDashboardClick: () => void;
}

const TIMEOUT = 1_500;

export const useProgressStepHook = (token: Token): IProgressStepHookData => {
  const [isTxCopied, setIsTxCopied] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const { address, chainId, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const onDashboardClick = (): void => {
    trackClickGoToDashboard({
      tokenName: token,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const handleCopyTxHash = useCallback(() => {
    setIsTxCopied(isCopied => !isCopied);
  }, [setIsTxCopied]);

  const handleCopyDestinationAddress = useCallback(() => {
    setIsAddressCopied(isCopied => !isCopied);
  }, [setIsAddressCopied]);

  useEffect(() => {
    if (!isTxCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(handleCopyTxHash, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isTxCopied, handleCopyTxHash]);

  useEffect(() => {
    if (!isAddressCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(handleCopyDestinationAddress, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isAddressCopied, handleCopyDestinationAddress]);

  return {
    isTxCopied,
    isAddressCopied,
    chainId: (chainId as number) ?? 1,
    handleCopyDestinationAddress,
    handleCopyTxHash,
    onDashboardClick,
  };
};
