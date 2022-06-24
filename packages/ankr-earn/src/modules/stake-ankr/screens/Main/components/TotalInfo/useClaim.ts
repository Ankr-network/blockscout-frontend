import BigNumber from 'bignumber.js';

import { useDialog } from 'modules/common/hooks/useDialog';

import { IAvailableClaimItem } from '../ClaimDialog';

// todo: use actual data
const demoClaims: IAvailableClaimItem[] = [
  {
    provider: 'Provider 1',
    value: new BigNumber(11),
  },
  {
    provider: 'Provider 2',
    value: new BigNumber(313213),
  },
];

interface IUseTotalInfo {
  availableClaims?: IAvailableClaimItem[];
  isClaimAllowed: boolean;
  isClaimLoading: boolean;
  isOpened: boolean;
  usdTokenPrice?: number;
  onClose: () => void;
  onOpen: () => void;
}

export const useClaim = (): IUseTotalInfo => {
  const { isOpened, onClose, onOpen } = useDialog();

  const availableClaims = demoClaims;

  const isClaimLoading = false;

  const isClaimAllowed = !!availableClaims?.length;

  const usdTokenPrice = 0.1;

  return {
    isClaimAllowed,
    isOpened,
    isClaimLoading,
    availableClaims,
    usdTokenPrice,
    onClose,
    onOpen,
  };
};
