import { TDeFiNetwork } from 'modules/defi-aggregator/api/defi';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { PolygonIcon } from 'uiKit/Icons/Polygon';

interface INetworkIconProps {
  name: TDeFiNetwork;
}

export const NetworkIcon = ({
  name,
}: INetworkIconProps): JSX.Element | null => {
  switch (name) {
    case 'ethereum':
      return <EthIcon />;
    case 'bnb':
      return <BNBIcon />;
    case 'polygon':
      return <PolygonIcon />;
    case 'avalanche':
      return <AvaxIcon />;
    case 'fantom':
      return <FantomIcon />;
    default:
      return null;
  }
};
