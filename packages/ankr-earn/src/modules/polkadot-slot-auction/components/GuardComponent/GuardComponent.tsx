import { BlockchainNetworkId } from 'modules/common/types';

interface IGuardComponentProps {
  availableNetworks: BlockchainNetworkId[];
  componentSlot: JSX.Element;
}

// @TODO Add implementation for this when we will have a common solution for Guards
export const GuardComponent = ({
  availableNetworks,
  componentSlot,
}: IGuardComponentProps) => {
  return componentSlot;
};
