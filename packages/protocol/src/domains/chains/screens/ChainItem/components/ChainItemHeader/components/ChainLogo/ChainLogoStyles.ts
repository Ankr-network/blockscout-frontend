import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainLogoStyles = makeStyles<number | undefined>()(
  (theme: Theme, size?: number) => {
    const logoSize = size || theme.spacing(17);

    return {
      chainLogo: {
        width: logoSize,
        height: logoSize,
      },
    };
  },
);
