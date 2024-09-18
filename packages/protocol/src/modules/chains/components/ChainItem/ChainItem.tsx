import { Typography } from '@mui/material';
import { TypographyOwnProps } from '@mui/material/Typography/Typography';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { getChainName } from 'uiKit/utils/metatags';
import { ChainLogo } from 'modules/chains/components/ChainLogo';

import { useChainItemStyles } from './useChainItemStyles';

interface IChainItemProps {
  chainId: ChainID;
  className?: string;
  variant?: TypographyOwnProps['variant'];
  iconSize?: number;
}

export const ChainItem = ({
  chainId,
  className,
  iconSize = 20,
  variant = 'body3',
}: IChainItemProps) => {
  const { classes, cx } = useChainItemStyles();

  const chainName = getChainName(chainId);

  return (
    <div className={cx(classes.chainItemWrapper, className)}>
      <ChainLogo
        chain={{ id: chainId, name: chainName } as Chain}
        size={iconSize}
      />
      <Typography variant={variant}>{chainName}</Typography>
    </div>
  );
};
