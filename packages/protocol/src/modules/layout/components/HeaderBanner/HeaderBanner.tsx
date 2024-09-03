import { Typography } from '@mui/material';
import { useEffect } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { HEADER_BANNER_ID } from 'modules/layout/const';

import { MaintenanceDialog } from '../MaintenanceDialog';
import { useHeaderBannerStyles } from './useHeaderBannerStyles';
import { bannerTranslation } from './translation';

export const HeaderBanner = () => {
  const { classes } = useHeaderBannerStyles();

  const { keys, tHTML } = useTranslation(bannerTranslation);

  const { isOpened, onClose, onOpen } = useDialog();

  const element = document.getElementById('learn-more');

  useEffect(() => {
    if (element) {
      element.onclick = onOpen;
    }
  }, [element, onOpen]);

  return (
    <>
      <div className={classes.root} id={HEADER_BANNER_ID}>
        <Typography variant="body3" className={classes.text}>
          {tHTML(keys.text)}
        </Typography>
      </div>

      <MaintenanceDialog isOpened={isOpened} onClose={onClose} />
    </>
  );
};
