import React, { useState, useCallback, useEffect } from 'react';
import { IconButton } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import Zendesk, { ZendeskAPI } from './zendesk';
import { ReactComponent as ZendeskHelpIcon } from './assets/help-icon.svg';
import { useStyles } from './useStyles';
import {
  ZENDESK_KEY,
  SETTINGS,
  hideUselessFields,
} from './ZendeskMounterUtils';

export const ZendeskMounter = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleHide = () => {
    ZendeskAPI('webWidget', 'hide');
  };

  const handleShow = () => {
    ZendeskAPI('webWidget', 'show');
  };

  const handleOpen = useCallback(() => {
    ZendeskAPI('webWidget', 'open');
  }, []);

  useEffect(() => {
    if (loaded) {
      handleHide();

      ZendeskAPI('webWidget:on', 'close', handleHide);
      ZendeskAPI('webWidget:on', 'open', handleShow);
      ZendeskAPI('webWidget:on', 'userEvent', (event: any) => {
        if (event.action === 'Contact Form Shown') {
          hideUselessFields();
        }
      });
    }
  }, [loaded]);

  useOnMount(() => {
    ZendeskAPI('webWidget', 'identify', {});
  });

  return (
    <>
      <Zendesk zendeskKey={ZENDESK_KEY} {...SETTINGS} onLoaded={handleLoaded} />
      <div className={classes.launcherContainer}>
        <IconButton className={classes.launcher} onClick={handleOpen}>
          <ZendeskHelpIcon className={classes.icon} />
          <div className={classes.launcherText}>{t('zendesk.get-help')}</div>
        </IconButton>
      </div>
    </>
  );
};
