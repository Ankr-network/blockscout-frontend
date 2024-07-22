import { Box, BoxProps } from '@mui/material';

import { useChainCardShadowStyles } from './useCardShadowStyles';

export interface ICardShadowProps extends BoxProps {}

export const ChainCardShadow = (props: ICardShadowProps) => {
  const { className } = props;

  const { classes, cx } = useChainCardShadowStyles();

  return <Box {...props} className={cx(classes.root, className)} />;
};
