import { Button, Typography } from '@mui/material';
import { Telegram, SlackLogo, OverlaySpinner } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { LoadableButton } from 'uiKit/LoadableButton';

import { useMessengersBlockStyles } from './useMessengersBlockStyles';
import { messengerBlockTranslation } from './translation';
import { useMessengerBlock } from './useMessengerBlock';

export const MessengersBlock = () => {
  const { classes } = useMessengersBlockStyles();

  const {
    handleConnectTelegram,
    handleDeleteTelegram,
    isDeleteNotificationsChannelLoading,
    isNotificationsChannelsDataFetching,
    isTelegramBotFetching,
    telegramUserName,
  } = useMessengerBlock();

  const { keys, t } = useTranslation(messengerBlockTranslation);

  if (isNotificationsChannelsDataFetching) {
    return <OverlaySpinner />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.name}>
          <Telegram className={classes.tgIcon} />
          <Typography variant="body3">
            {telegramUserName
              ? t(keys.tgName, { name: telegramUserName })
              : t(keys.telegram)}
          </Typography>
        </div>
        {telegramUserName ? (
          <LoadableButton
            size="small"
            loading={isDeleteNotificationsChannelLoading}
            onClick={handleDeleteTelegram}
          >
            {t(keys.disconnect)}
          </LoadableButton>
        ) : (
          <LoadableButton
            size="small"
            loading={isTelegramBotFetching}
            onClick={handleConnectTelegram}
          >
            {t(keys.connect)}
          </LoadableButton>
        )}
      </div>
      <div className={classes.row}>
        <div className={classes.name}>
          <SlackLogo />
          <Typography variant="body3">{t(keys.slack)}</Typography>
        </div>
        <Button disabled size="small">
          {t(keys.connect)}
        </Button>
      </div>
    </div>
  );
};
