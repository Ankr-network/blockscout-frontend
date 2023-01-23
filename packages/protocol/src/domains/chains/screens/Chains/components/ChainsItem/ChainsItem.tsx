import { ChainType } from 'domains/chains/types';
import { ChainsItemBase } from './ChainsItemBase';
import { ChainsItemButton } from './ChainsItemButton';
import { ChainsItemLink } from './ChainsItemLink';
import { ChainsItemProps } from './ChainsItemTypes';
import { INDEX_PATH } from 'domains/chains/routes';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useChainsItem } from '../../hooks/useChainsItem';
import { useDialog } from 'modules/common/hooks/useDialog';

export const ChainsItem = ({
  urls,
  chain,
  hasPrivateAccess,
  publicChain,
  hasConnectWalletMessage,
  ...props
}: ChainsItemProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  const { dummyMessage, handleOriginUrlClick } = useChainsItem(
    chain,
    hasPrivateAccess,
    INDEX_PATH,
  );

  return (
    <>
      <ChainsItemBase
        {...props}
        chain={chain}
        hasPrivateAccess={hasPrivateAccess}
        handleOriginUrlClick={handleOriginUrlClick}
        chainsItemLink={
          <ChainsItemLink
            chainType={chain.type as unknown as ChainType}
            dummyMessage={dummyMessage}
            hasConnectWalletMessage={hasConnectWalletMessage}
            onConnectWallet={onOpen}
            urls={urls}
          />
        }
        chainsItemButton={<ChainsItemButton publicChain={publicChain} />}
      />
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
