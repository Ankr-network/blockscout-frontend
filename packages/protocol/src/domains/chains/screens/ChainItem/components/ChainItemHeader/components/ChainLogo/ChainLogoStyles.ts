import { makeStyles } from 'tss-react/mui';

export const useChainLogoStyles = makeStyles<number | undefined>()(
  (_theme, size?: number) => {
    const logoSize = size || 48;

    return {
      chainLogo: {
        width: logoSize,
        height: logoSize,
      },
    };
  },
);
