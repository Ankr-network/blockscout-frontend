import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';

import { TPolkadotToken } from '../../../../types';

import { useUnstakeRenderFormFooterStyles } from './useUnstakeRenderFormFooterStyles';

interface IUnstakeRenderFormFooterProps {
  amount: BigNumber;
  polkadotToken: TPolkadotToken;
}

export const UnstakeRenderFormFooter = ({
  amount,
  polkadotToken,
}: IUnstakeRenderFormFooterProps): JSX.Element => {
  const classes = useUnstakeRenderFormFooterStyles();

  return (
    <Box display="flex" mt={2}>
      <Typography
        className={classes.infoItem}
        color="textPrimary"
        variant="body2"
      >
        {t('stake.you-will-get')}
      </Typography>

      <Box ml="auto" />

      <Typography
        className={classes.infoItem}
        color="textPrimary"
        variant="body2"
      >
        {t('unit.token-value', {
          value: amount.isNaN() ? 0 : amount.decimalPlaces(DECIMAL_PLACES),
          token: polkadotToken,
        })}
      </Typography>
    </Box>
  );
};
