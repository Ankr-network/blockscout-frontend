import { RadioGroupItem } from '@ankr.com/ui';
import { SubscriptionPrice } from 'multirpc-sdk';
import { SxProps, Theme } from '@mui/material';
import { t } from '@ankr.com/common';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';

const getStyles =
  (isLightTheme: boolean): SxProps<Theme> =>
  theme => ({
    gap: theme.spacing(2.5),

    span: {
      color: theme.palette.grey[isLightTheme ? 700 : 600],

      fontSize: '16px !important',
      lineHeight: '24px',
    },
  });

export const getUSDPricesItems = (
  prices: SubscriptionPrice[],
  isLightTheme: boolean,
): RadioGroupItem[] => {
  const styles = getStyles(isLightTheme);

  const oneTimePayment: RadioGroupItem = {
    id: ONE_TIME_PAYMENT_ID,
    props: {
      label: t('account.account-details.top-up.usd-one-time'),
      sx: styles,
    },
  };

  return [
    oneTimePayment,
    ...prices.map<RadioGroupItem>(({ id, amount, interval }) => ({
      id,
      props: {
        label: `$${amount}/${interval.substring(0, 2)}`,
        sx: styles,
      },
    })),
  ];
};
