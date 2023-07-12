import { getChainIcon } from 'uiKit/utils/getTokenIcon';
import { useBlockchainIconStyles } from './useBlockchainIconStyles';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { ChainID } from 'domains/chains/types';

interface BlockchainIconProps {
  blockchains: string[];
}

export const BlockchainIcon = ({ blockchains }: BlockchainIconProps) => {
  const { classes } = useBlockchainIconStyles();

  const { isLightTheme } = useThemes();

  return (
    <div className={classes.root}>
      {blockchains.map(blockchain => (
        <img
          key={blockchain}
          className={classes.icon}
          src={getChainIcon(blockchain as ChainID, isLightTheme)}
          alt={blockchain}
        />
      ))}
    </div>
  );
};