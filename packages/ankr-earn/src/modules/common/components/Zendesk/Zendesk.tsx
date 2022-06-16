import { IconButton } from '@material-ui/core';

import { t } from 'common';
import { useIsXSDown } from 'ui';

import { ZendeskHelpCircleIcon } from 'uiKit/Icons/ZendeskCircleIcon';
import { ZendeskHelpIcon } from 'uiKit/Icons/ZendeskHelpIcon';

import { useZendeskHook } from './useZendeskHook';
import { useZendeskStyles } from './useZendeskStyles';

const ZENDESK_KEY = process.env.REACT_APP_ZENDESK_KEY ?? '';

const ZENDESK_SETTINGS = {
  launcher: {
    chatLabel: {
      'en-US': t('zendesk.needHelp'),
    },

    mobile: {
      labelVisible: false,
    },
  },

  contactForm: {
    fields: [{ id: 'description' }],
  },
};

export const Zendesk = (): JSX.Element | null => {
  const classes = useZendeskStyles();
  const isXSDown = useIsXSDown();

  const { onOpen } = useZendeskHook({
    zendeskKey: ZENDESK_KEY,
    ...ZENDESK_SETTINGS,
  });

  return (
    <div className={classes.launcherContainer}>
      <IconButton className={classes.launcher} onClick={onOpen}>
        {isXSDown ? (
          <ZendeskHelpCircleIcon
            className={classes.icon}
            data-testid="zendesk-circle-icon"
            size={32}
          />
        ) : (
          <ZendeskHelpIcon
            className={classes.icon}
            data-testid="zendesk-help-icon"
            size={24}
          />
        )}

        <div className={classes.launcherText}>{t('zendesk.help')}</div>
      </IconButton>
    </div>
  );
};
