import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from 'uiKit/Icons/AAvaxCIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { ADOTBIcon } from 'uiKit/Icons/ADOTBIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AFTMCIcon } from 'uiKit/Icons/AFTMCIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { ReactComponent as StEthIcon } from '../../assets/icon-stETH.svg';
import { ReactComponent as StMATICIcon } from '../../assets/icon-stMATIC.svg';
import { ReactComponent as WstEthIcon } from '../../assets/icon-wstETH.svg';

interface ITokenIconProps {
  name: string;
  className?: string;
}

export const TokenIcon = ({
  name,
  className,
}: ITokenIconProps): JSX.Element | null => {
  const props = { className };

  switch (name) {
    case 'ANKR':
      return <AnkrIcon {...props} />;
    case 'wETH':
    case 'ETH':
      return <EthIcon {...props} />;
    case 'ankrETH':
    case 'aETHc':
    case 'aETHCrv':
    case 'aETHCrv (ankrETH)':
      return <AETHCIcon {...props} />;
    case 'aETHb':
      return <AETHBIcon {...props} />;
    case 'BNB':
    case 'wBNB':
      return <BNBIcon {...props} />;
    case 'aBNBb':
      return <ABNBBIcon {...props} />;
    case 'ankrBNB':
    case 'aBNBc':
      return <ABNBCIcon {...props} />;
    case 'wMATIC':
    case 'MATIC':
      return <MaticIcon {...props} />;
    case 'aMATICb':
      return <AMATICBIcon {...props} />;
    case 'ankrMATIC':
    case 'aMATICc':
      return <AMATICCIcon {...props} />;
    case 'stMATIC':
      return <StMATICIcon {...props} />;
    case 'wAVAX':
    case 'AVAX':
      return <AvaxIcon {...props} />;
    case 'aAVAXb':
      return <AAvaxBIcon {...props} />;
    case 'ankrAVAX':
    case 'aAVAXc':
      return <AAvaxCIcon {...props} />;
    case 'wFTM':
    case 'FTM':
      return <FantomIcon {...props} />;
    case 'aFTMb':
      return <AFTMBIcon {...props} />;
    case 'ankrFTM':
    case 'aFTMc':
      return <AFTMCIcon {...props} />;
    case 'aDOTb':
      return <ADOTBIcon {...props} />;
    case 'aKSMb':
      return <KsmIcon {...props} />;
    case 'wstETH':
      return <WstEthIcon {...props} />;
    case 'stETH':
      return <StEthIcon {...props} />;
    default:
      return null;
  }
};
