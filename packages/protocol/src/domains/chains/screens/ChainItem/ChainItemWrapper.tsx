import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ChainItemQuery as ChainItemBase } from './ChainItemQuery';
import { NoReactSnap } from 'uiKit/NoReactSnap';

export const ChainItem = () => {
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  return (
    <NoReactSnap>
      <ChainItemBase chainId={chainId} />
    </NoReactSnap>
  );
};
