import { ChainsItemProps } from './ChainsItemTypes';
import { ChainsItemBase } from './ChainsItemBase';
import { ChainsItemLink } from './ChainsItemLink';
import { useChainsItem } from '../../hooks/useChainsItem';
import { INDEX_PATH } from 'domains/chains/routes';
import { ChainsItemButton } from './ChainsItemButton';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
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
            dummyMessage={dummyMessage}
            urls={urls}
            hasConnectWalletMessage={hasConnectWalletMessage}
            onConnectWallet={onOpen}
          />
        }
        chainsItemButton={<ChainsItemButton publicChain={publicChain} />}
      />
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
