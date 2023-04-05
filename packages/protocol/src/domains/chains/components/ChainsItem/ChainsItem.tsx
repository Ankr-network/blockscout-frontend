import { ChainType } from 'domains/chains/types';
import { ChainsItemBase } from '../ChainsItemBase';
import { ChainsItemButton } from './components/ChainsItemButton';
import { ChainsItemLink } from './components/ChainsItemLink';
import { ChainsItemProps } from './ChainsItemTypes';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export const ChainsItem = ({
  urls,
  chain,
  hasPrivateAccess,
  publicChain,
  hasConnectWalletMessage,
  dummyMessage,
  ...props
}: ChainsItemProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <ChainsItemBase
        {...props}
        chain={chain}
        chainsItemLink={
          <ChainsItemLink
            chainType={chain.type as unknown as ChainType}
            dummyMessage={dummyMessage}
            hasConnectWalletMessage={hasConnectWalletMessage}
            onConnectWallet={onOpen}
            urls={urls}
          />
        }
        chainsItemButton={
          publicChain && <ChainsItemButton chain={publicChain} />
        }
      />
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
