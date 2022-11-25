import { ChainsItemProps } from './ChainsItemTypes';
import { ChainsItemBase } from './ChainsItemBase';
import { ChainsItemLink } from './ChainsItemLink';
import { useChainsItem } from '../../hooks/useChainsItem';
import { INDEX_PATH } from 'domains/chains/routes';
import { ChainsItemButton } from './ChainsItemButton';

export const ChainsItem = ({
  urls,
  chain,
  isPremium,
  publicChain,
  hasConnectWalletMessage,
  ...props
}: ChainsItemProps) => {
  const { dummyMessage, handleOriginUrlClick } = useChainsItem(
    chain,
    isPremium,
    INDEX_PATH,
  );

  return (
    <ChainsItemBase
      {...props}
      chain={chain}
      isPremium={isPremium}
      handleOriginUrlClick={handleOriginUrlClick}
      chainsItemLink={
        <ChainsItemLink
          dummyMessage={dummyMessage}
          urls={urls}
          hasConnectWalletMessage={hasConnectWalletMessage}
        />
      }
      chainsItemButton={<ChainsItemButton publicChain={publicChain} />}
    />
  );
};
