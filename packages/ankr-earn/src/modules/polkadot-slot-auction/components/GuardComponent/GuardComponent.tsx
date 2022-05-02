import { EEthereumNetworkId } from 'modules/common/types';

interface IGuardComponentProps {
  availableNetworks: EEthereumNetworkId[];
  componentSlot: JSX.Element;
}

// @TODO Add implementation for this when we will have a common solution for Guards
export const GuardComponent = ({
  componentSlot,
}: IGuardComponentProps): JSX.Element => {
  return componentSlot;
};
